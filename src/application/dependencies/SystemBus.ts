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

import SystemBus from "../../domain/service/messaging/SystemBus";
import EventBus from "../../domain/service/messaging/EventBus";
import CommandBus from "../../domain/service/messaging/CommandBus";
import QueryBus from "../../domain/service/messaging/QueryBus";
import LoggingMiddleware from "../../domain/service/messaging/LoggingMiddleware";
import CommandHandlingMiddleware from "../../domain/service/messaging/CommandHandlingMiddleware";
import QueryHandlingMiddleware from "../../domain/service/messaging/QueryHandlingMiddleware";

const eventBus = new EventBus([
    LoggingMiddleware('Event Bus'),
]);
const commandBus = new CommandBus([
    LoggingMiddleware('Command Bus'),
    CommandHandlingMiddleware,
]);
const queryBus = new QueryBus([
    LoggingMiddleware('Query Bus'),
    QueryHandlingMiddleware,
]);
const bus = new SystemBus(eventBus, commandBus, queryBus);

export default bus;
