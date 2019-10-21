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

import uuidv1 from 'uuid/v1';

export interface Message {
    headers: Object;
    _context: string;
    _id: string;
    _name: string;
    _type: string;
    [key: string]: any;
}

export class Message implements Message {
    _id: string;
    _name: string;
    _context: string;
    _type: string;
    headers: Object;

    constructor(headers?: Object, context?: string, data?: Object) {
        this._id = uuidv1();
        if (headers !== undefined) {
            this.headers = headers;
        }

        if (context !== undefined) {
            this._context = context;
        }

        if (data !== undefined) {
            Object.assign(this, data);
        }
    }
}
