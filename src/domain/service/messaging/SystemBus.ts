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

import EventBus from "./EventBus";
import CommandBus from "./CommandBus";
import QueryBus from "./QueryBus";
import Command from "../../entity/messaging/Command";
import Query from "../../entity/messaging/Query";
import Event from "../../entity/messaging/Event";
import MessageFactory from "../../factory/MessageFactory";
import {SearchCriteria} from "../../repository/SearchCriteria";

export default class SystemBus {
    readonly eventBus: EventBus;
    readonly commandBus: CommandBus;
    readonly queryBus: QueryBus;

    constructor(eventBus: EventBus, commandBus: CommandBus, queryBus: QueryBus) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    dispatch(event: Event | string, data?: Object): Promise<any> {
        let e = event;
        if (typeof event === 'string') {
            e = MessageFactory.event(<string> event, data);
        }
        return this.eventBus.dispatch(<Event> e);
    }

    invoke(command: Command | string, data?: Object): Promise<any> {
        let c = command;
        if (typeof command === 'string') {
            c = MessageFactory.command(<string> command, data);
        }
        return this.commandBus.invoke(<Command> c);
    }

    request(query: Query | string, searchCriteria?: SearchCriteria, data?: Object): Promise<any> {
        let q = query;
        if (typeof query === 'string') {
            q = MessageFactory.query(<string> query, searchCriteria, data);
        }
        return this.queryBus.request(<Query> q);
    }
}
