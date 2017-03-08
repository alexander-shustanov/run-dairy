/**
 * Created by alexander on 06.03.17.
 */
'use strict';

import RecordActionTypes from './RecordActionTypes';
import Dispatcher from './RecordDispatcher';

const Actions = {
    addRecord(record) {
        Dispatcher.dispatch({
            type: RecordActionTypes.ADD_RECORD,
            record
        });
    },
    deleteRecord(id) {
        Dispatcher.dispatch({
            type: RecordActionTypes.DELETE_RECORD,
            id
        });
    },
    editRecordDraft(distance) {
        Dispatcher.dispatch({
            type: RecordActionTypes.UPDATE_DRAFT_RECORD,
            distance
        });
    }
};

export default Actions;
