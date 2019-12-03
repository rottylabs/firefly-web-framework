/*
 * Copyright (c) 2019 JD Williams
 *
 * This file is part of Firefly, a Python SOA framework built by JD Williams. Firefly is free software; you can
 * redistribute it and/or modify it under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 3 of the License, or (at your option) any later version.
 *
 * Firefly is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the
 * implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
 * Public License for more details. You should have received a copy of the GNU Lesser General Public
 * License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * You should have received a copy of the GNU General Public License along with Firefly. If not, see
 * <http://www.gnu.org/licenses/>.
 */

const inflection = require('inflection');

class AttributeString {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

class Attribute {
    name: AttributeString;

    constructor(name: string) {
        this.name = new AttributeString(inflection.underscore(name));
    }

    equals(value) {
        return new SearchCriteria(this.name, '==', value);
    }

    doesNotEqual(value) {
        return new SearchCriteria(this.name, '!=', value);
    }

    isGreaterThan(value) {
        return new SearchCriteria(this.name, '>', value);
    }

    isLessThan(value) {
        return new SearchCriteria(this.name, '<', value);
    }

    isGreaterThanOrEqualTo(value) {
        return new SearchCriteria(this.name, '>=', value);
    }

    isLessThanOrEqualTo(value) {
        return new SearchCriteria(this.name, '<=', value);
    }

    isNull() {
        return new SearchCriteria(this.name, 'is', 'None');
    }

    isTrue() {
        return new SearchCriteria(this.name, 'is', true);
    }

    isFalse() {
        return new SearchCriteria(this.name, 'is', false);
    }

    isIn(values) {
        return new SearchCriteria(this.name, 'in', values);
    }

    contains(value) {
        return new SearchCriteria(this.name, 'contains', value);
    }
}

export class SearchCriteria {
    lhv: any;
    op: string;
    rhv: any;

    constructor(lhv: any, op: string, rhv: any) {
        this.lhv = lhv;
        this.op = op;
        this.rhv = rhv;
    }

    and(criteria: SearchCriteria) {
        return new SearchCriteria(this, 'and', criteria);
    }

    or(criteria: SearchCriteria) {
        return new SearchCriteria(this, 'or', criteria);
    }

    toObject() {
        return this.doToObject(this);
    }

    private doToObject(criteria: SearchCriteria) {
        const ret = {l: null, o: criteria.op, r: null};

        if (criteria.lhv instanceof SearchCriteria) {
            ret.l = this.doToObject(criteria.lhv);
        } else if (criteria.lhv instanceof AttributeString) {
            ret.l = `a:${criteria.lhv.value}`;
        } else {
            ret.l = criteria.lhv;
        }

        if (criteria.rhv instanceof SearchCriteria) {
            ret.r = this.doToObject(criteria.rhv);
        } else if (criteria.rhv instanceof AttributeString) {
            ret.r = `a:${criteria.rhv.value}`;
        } else {
            ret.r = criteria.rhv;
        }

        return ret;
    }
}

export const where = (property) => {
    return new Attribute(property);
};