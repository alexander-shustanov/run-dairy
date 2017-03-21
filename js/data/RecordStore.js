/**
 * Created by alexander on 06.03.17.
 */

'use strict';

import {ReduceStore} from 'flux/utils';
import RecordDispatcher from './RecordDispatcher';
import Immutable from 'immutable';
import RecordActionTypes from './RecordActionTypes';
import Record from './Record';
import Weather from './Weather';
import RecordCounter from './RecordCounter';

class RecordStore extends ReduceStore {
    constructor() {
        super(RecordDispatcher);
    }

    getInitialState() {
        let state = {val: Immutable.OrderedMap()};
        if (localStorage.recordStore) {
            JSON
                .parse(localStorage.recordStore)
                .map(record => new Record(record).set("weather", new Weather(record.weather)))
                .forEach(record => state.val = state.val.set(record.id, record));
        }
        return state.val;
    }

    reduce(state, action) {
        switch (action.type) {
            case RecordActionTypes.ADD_RECORD:
                const id = RecordCounter.increment();
                return RecordStore.save(
                    state.set(id, action.record.set("id", id))
                );
            case RecordActionTypes.DELETE_RECORD:
                return RecordStore.save(state.remove(action.id));
            default:
                return state;
        }
    }

    static save(state) {
        localStorage.recordStore = JSON
            .stringify(Array.from(state.values())
                .map(RecordStore.recordToJs)
            );
        return state;
    }

    static recordToJs(record) {
        return {
            id: record.id,
            date: record.date,
            time: record.time,
            distance: record.distance,
            weather: RecordStore.weatherToJs(record.weather),
            photos: record.photos,
            track: record.track
        }
    }

    static weatherToJs(weather) {
        return {
            temperature: weather.temperature,
            humidity: weather.humidity,
            precipitation: weather.precipitation
        };
    }

}

export default new RecordStore();
