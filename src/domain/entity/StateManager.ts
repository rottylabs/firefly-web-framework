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

import bus from "../../application/dependencies/SystemBus";
import {SearchCriteria, where} from "../repository/SearchCriteria";
import Query from "./messaging/Query";
import "reflect-metadata";
import MessageFactory from "../factory/MessageFactory";
// import {m} from "../../index";
import m from "mithril";
import Stream from 'mithril/stream';

export class StateManager {
    firefly?: Stream<object>;
    [key: string]: Stream<any> | Function;

    constructor(state: object) {
        this.firefly = stream({ defaultValue: {
            loading: {},
        }});
        Object.assign(this, state);
    }

    setLoading(stream: string, value: boolean) {
        const state = this.firefly();
        state['loading'][stream] = value;
        this.firefly(state);
    }

    isNotLoading(streams: string | string[]): boolean {
        const loading = this.firefly()['loading'];
        if (typeof streams === 'string') {
            return loading[streams] === false;
        }

        let ret = true;
        streams.forEach((stream: string) => {
            if (loading[stream] === true) {
                ret = false;
                return false;
            }
            return true;
        });

        return ret;
    }
}

export function stream(
    {query = null, criteria = null, data = null, defaultValue = null, fetch = 'lazy'}:
        {query?: Query | string, criteria?: SearchCriteria, data?: Object, defaultValue?: any, fetch?: string} = {}
): Stream<any> {
    if (typeof query === 'string') {
        query = MessageFactory.query(query, criteria, data);
    }
    let runQuery = null;
    if (query !== null) {
        runQuery = () => bus.request(query);
    }
    const value = Stream(defaultValue);
    value.map(() => m.redraw());

    let initialized = false;
    value.map(() => {
        if (!initialized) {
            initialized = true;
            if (runQuery) {
                runQuery().then((v) => {
                    value(v);
                });
            }
            return undefined;
        }
    });

    if (fetch === 'eager') {
        if (runQuery) {
            runQuery().then(value);
        }
        initialized = true;
    } else if (runQuery === null) {
        initialized = true;
    }

    return value;
}

export function manage({query, criteria = null, data = null, fetch = 'lazy'}: {query: Query | string, criteria?: SearchCriteria, data?: Object, fetch?: string}) {
    if (typeof query === 'string') {
        query = MessageFactory.query(query, criteria, data);
    }
    const runQuery = () => bus.request(query);

    return (target: any, key: string | symbol) => {
        let defaultValue = undefined;

        const value = Stream(Reflect.get(target, key));
        // Reflect.set(target, key, value);
        if (delete this[key]) {

        }

        if (fetch === 'lazy') {
            // value = undefined;
        } else if (fetch === 'eager') {
            runQuery().then(value);
        }

        // if (delete this[key]) {
        //     this[key] = value;
        //     // Object.defineProperty(target, key, {
        //     //     get: value,
        //     //     set: value,
        //     //     enumerable: true,
        //     //     configurable: true,
        //     // });
        // }
    };
}

export function stateManager() {
    return function <T extends { new(...args: any[]): {} }>(target: T) {
        const original = target;

        function construct(constructor, args) {
            const c: any = function() {
                return new constructor(...args);
            };
            c.prototype = constructor.prototype;
            return new c();
        }

        const f: any = function(...args) {
            let newConstructor = construct(original, args);
            const cache = {};
            return new Proxy(newConstructor, {
                get(target, name) {
                    if (!(name in cache)) {
                        bus.request('iam.Users', where('givenName').equals('Doofus')).then((result) => {
                            Reflect.set(target, name, result);
                            cache[name] = true;
                        }).catch(console.error);
                    }
                    return Reflect.get(target, name)
                },
            });
        };

        f.prototype = original.prototype;

        return f;
    };
}