/**
 * Created by alexander on 12.03.17.
 */

import ActionTypes from './DateDialogActionTypes';
import Dispatcher from '../../data/RecordDispatcher';

const Actions = {
    chooseDate(date) {
        Dispatcher.dispatch({
            type: ActionTypes.DATE_DIALOG_CHOOSE_DATE,
            date
        });
    },
    changeCurDate(date) {
        Dispatcher.dispatch({
            type: ActionTypes.DATE_DIALOG_CHANGE_CUR_DATE,
            date
        });
    },
    toggle() {
        Dispatcher.dispatch({
            type: ActionTypes.DATE_DIALOG_TOGGLE
        });
    }
};

export default Actions;
