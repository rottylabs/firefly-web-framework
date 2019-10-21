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

import Event from "../entity/messaging/event";
import Command from "../entity/messaging/command";
import Query from "../entity/messaging/query";

export default class MessageFactory {
    static event(name: string, data: Object) {
        return MessageFactory.build(name, data, Event)
    }

    static command(name: string, data: Object) {
        return MessageFactory.build(name, data, Command)
    }

    static query(name: string, data: Object) {
        return MessageFactory.build(name, data, Query);
    }

    private static build(name: string, data: Object, type) {
        let context = 'web_app';
        if (name.includes('.')) {
            const parts = name.split('.');
            context = parts[0];
            name = parts[1];
        }
        const ret = new type({}, context, data);
        ret._name = name;

        return ret;
    }
}
