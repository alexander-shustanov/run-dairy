/**
 * Created by alexander on 12.03.17.
 */

import {ReduceStore} from 'flux/utils';
import DateDialogState from './DateDialogState';
import Dispatcher from '../../data/RecordDispatcher';
import ActionTypes from './DateDialogActionTypes';

class DateDialogStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return new DateDialogState();
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.DATE_DIALOG_CHOOSE_DATE:
                return state.set("chosenDate", action.date).set("curMonth", action.date);
            case ActionTypes.DATE_DIALOG_CHANGE_CUR_DATE: {
                return state.set("curMonth", action.date);
            }
            case ActionTypes.DATE_DIALOG_TOGGLE:
                return new DateDialogState().set("visible", !(state.visible));
            default:
                return state;
        }
    }
}

export default new DateDialogStore();
