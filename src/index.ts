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

import PromiseWorker from "promise-worker";
import Query from "./domain/entity/messaging/Query";

export default class FireflyWorker {
    worker: Worker;
    promiseWorker: PromiseWorker;

    constructor() {
        console.log('Constructing!');
        const self = this;
        navigator.serviceWorker.register('serviceWorker.js', {
            scope: './',
        }).then(() => {
            console.log('First promise');
            if (navigator.serviceWorker.controller) {
                return navigator.serviceWorker;
            }
            return new Promise((resolve) => {
                function onControllerChange() {
                    navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
                    resolve(navigator.serviceWorker);
                }
                navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
            });
        }).then((worker: Worker) => {
            console.log('Second promise');
            self.promiseWorker = new PromiseWorker(worker);
            console.log('New PromiseWorker', self.promiseWorker);
            worker.onmessage = self.handleMessage;
            console.log('onmessage configured');
        }).catch(console.error);

        // navigator.serviceWorker.getRegistrations().then(
        //     function(registrations) {
        //         console.log('Unregistering');
        //         for(let registration of registrations) {
        //             registration.unregister().catch(console.error);
        //         }
        //     });

        // this.worker = new Worker('worker.js');
        // this.promiseWorker = new PromiseWorker(this.worker);
    }

    handleMessage(message) {
        console.log('Fukc ya', message);
    }

    async query(query: Query) {
        return this.promiseWorker.postMessage({
            type: 'query',
            data: query,
        });
    }
}
