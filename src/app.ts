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
import PromiseWorker from "promise-worker";
// import FireflyWorker from "./index";
//
// const fw = new FireflyWorker();

// let promiseWorker;
// navigator.serviceWorker.register('serviceWorker.js', {
//     scope: './',
// }).then(() => {
//     console.log('First promise');
//     if (navigator.serviceWorker.controller) {
//         return navigator.serviceWorker;
//     }
//     return new Promise((resolve) => {
//         function onControllerChange() {
//             navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
//             resolve(navigator.serviceWorker);
//         }
//         navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
//     });
// }).then((worker: Worker) => {
//     console.log('Second promise');
//     promiseWorker = new PromiseWorker(worker);
//     console.log('New PromiseWorker', promiseWorker);
//     // worker.onmessage = handleMessage;
//     // console.log('onmessage configured');
// }).catch(console.error);

// import bus from "./application/dependencies/SystemBus";
// import mf from "./domain/factory/MessageFactory";


// const worker = new Worker();
// worker.onmessage = (message) => {
//     console.log('Got a message!', message);
// };

// bus.dispatch(mf.event('SomethingHappened', {'foo': 'bar'}));

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
