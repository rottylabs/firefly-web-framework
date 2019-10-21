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

import EventBus from "./eventBus";
import CommandBus from "./commandBus";
import QueryBus from "./queryBus";
import Command from "../../entity/messaging/command";
import Query from "../../entity/messaging/query";
import Event from "../../entity/messaging/event";
import MessageFactory from "../../factory/messageFactory";

export default class SystemBus {
    readonly eventBus: EventBus;
    readonly commandBus: CommandBus;
    readonly queryBus: QueryBus;

    constructor(eventBus: EventBus, commandBus: CommandBus, queryBus: QueryBus) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    dispatch(event: Event | string, data?: Object) {
        let e = event;
        if (event instanceof String) {
            e = MessageFactory.event(<string> event, data);
        }
        return this.eventBus.dispatch(<Event> e);
    }

    invoke(command: Command | string, data?: Object) {
        let c = command;
        if (command instanceof String) {
            c = MessageFactory.command(<string> command, data);
        }
        return this.commandBus.invoke(<Command> c);
    }

    query(query: Query | string, data?: Object) {
        let q = query;
        if (query instanceof String) {
            q = MessageFactory.query(<string> query, data);
        }
        return this.queryBus.query(<Query> q);
    }
}
