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
        return new Record();
    }

    reduce(state, action) {
        switch (action.type) {
            case RecordActionTypes.ADD_RECORD:
                return this.getInitialState();
            case RecordActionTypes.UPDATE_DRAFT_RECORD:
                alert(action.record.date);
                return action.record;
            default:
                return state;
        }
    }

}

export default new RecordStore();
