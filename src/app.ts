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

// import m from './infrastructure/factory/componentFactory';
import m from 'mithril';
import Stream from 'mithril/stream';

console.log(m);

import Worker from 'worker-loader!./application/service/worker/repository.worker';
import bus from "./application/dependencies/systemBus";
import mf from "./domain/factory/messageFactory";

const worker = new Worker();
worker.onmessage = (message) => {
    console.log('Got a message!', message);
};

bus.dispatch(mf.event('SomethingHappened', {'foo': 'bar'}));

// interface Attrs {
//     bus: Bus;
// }
//
// function MyComp(bus: Bus) {
//     const value = bus.query('something');
//     return {
//         view() {
//             return [
//                 m('button', {onclick: () => bus.invoke('fuck ya')}, 'Click Me'),
//                 m('h1', value()),
//             ];
//         }
//     }
// }
//
// m.mount(document.body, {
//     view: () => m(MyComp(bus))
// });
//
// setTimeout(() => {
//     bus.stream('baz');
//     m.redraw();
// }, 2000);
