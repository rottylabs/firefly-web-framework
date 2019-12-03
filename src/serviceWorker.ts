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

const ctx: ServiceWorkerGlobalScope = self as any;
import {get, set} from "idb-keyval";
import registerPromiseWorker from "promise-worker/register";
import uuidv1 from "uuid/v1";

const cacheVersion = 'v1';

export function getClientId(): Promise<string> {
    return get('clientId').then((c: string) => {
        if (c) {
            return c;
        }

        const clientId: string = uuidv1();
        set('clientId', clientId).catch(console.error);

        return clientId;
    });
}

registerPromiseWorker((message) => {
    switch(message.type) {
        case 'query':
            return [{'foo': 'bar'}];
    }
});

ctx.addEventListener('install', (event: ExtendableEvent) => {
    // event.waitUntil(
    //     caches.open('v1').then((cache) => {
    //         // return cache.addAll([
    //         //     './worker/',
    //         // ]);
    //     })
    // );
});

ctx.addEventListener('activate', (event) => {
    event.waitUntil(ctx.clients.claim());
});

function customRequest(request, clientId) {
    return new Request(request, {
        headers:{
            ...request.headers,
            'Firefly-Client-ID': clientId,
        },
    });
}

ctx.addEventListener('fetch', (event: FetchEvent) => {
    getClientId().then((clientId) => {
        const request = customRequest(event.request, clientId);
        console.log('new request', request.headers);
        event.respondWith(fetch(request));
    });

    // TODO Fix this.
    // if (request.method.toLowerCase() === 'get') {
    //     event.respondWith(
    //         caches.match(request).then((resp) => {
    //             return resp || fetch(request).then((response) => {
    //                 return caches.open(cacheVersion).then((cache) => {
    //                     cache.put(request, response.clone()).catch(console.error);
    //                     return response;
    //                 });
    //             });
    //         })
    //     );
    // } else {
    //     event.respondWith(fetch(request));
    // }
});

// TODO get this from env.
const websocket = new WebSocket('ws://localhost:9001');

websocket.onerror = console.error;
websocket.onmessage = (event) => {
    // TODO This may not be a CrudEvent
    postMessage({
        type: 'CrudEvent',
        context: event.data._context,
    });
};

websocket.onopen = () => {
    getClientId().then((clientId) => {
        websocket.send(JSON.stringify({
            id: clientId,
        }));
    });
};
