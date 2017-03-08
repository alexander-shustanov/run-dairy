/**
 * Created by alexander on 06.03.17.
 */

'use strict';

import {ReduceStore} from 'flux/utils';
import RecordDispatcher from './RecordDispatcher';
import Immutable from 'immutable';
import RecordActionTypes from './RecordActionTypes';
import Record from './Record';
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
                .map(record => new Record(record))
                .forEach(record => state.val = state.val.set(record.id, record));
        }
        return state.val;
    }

    reduce(state, action) {
        switch (action.type) {
            case RecordActionTypes.ADD_RECORD:
                const id = RecordCounter.increment();
                return this.save(
                    state.set(id, action.record.set("id", id))
                );
            case RecordActionTypes.DELETE_RECORD:
                return this.save(state.remove(action.id));
            default:
                return state;
        }
    }

    save(state) {
        localStorage.recordStore = JSON
            .stringify(Array.from(state.values())
                .map(record => {
                    return {
                        id: record.id,
                        datetime: record.datetime,
                        distance: record.distance,
                        weather: record.weather,
                        photos: record.photos,
                        track: record.track
                    }
                })
            );
        return state;
    }

}

export default new RecordStore();
