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

let validate = function (field, value) {
    switch (field) {
        default:
            return value != null && value != "";

    }
};

class RecordStore extends ReduceStore {
    constructor() {
        super(RecordDispatcher);
    }

    getInitialState() {
        return new (Immutable.Record({
            record: new Record(),
            validator: validate,
            showError: false
        }))();
    }

    reduce(state, action) {
        switch (action.type) {
            case RecordActionTypes.ADD_RECORD:
                return this.getInitialState();
            case RecordActionTypes.UPDATE_DRAFT_RECORD:
                return state.set("record", action.record);
            case RecordActionTypes.SHOW_ERROR:
                return state.set("showError", true);
            default:
                return state;
        }
    }

}

export default new RecordStore();
