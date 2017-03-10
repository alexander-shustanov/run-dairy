/**
 * Created by alexander on 09.03.17.
 */

'use strict';

import CalendarActionTypes from './CalendarActionTypes';
import Dispatcher from '../RecordDispatcher';

const Actions = {
    prev() {
        Dispatcher.dispatch({
            type: CalendarActionTypes.PREV
        })
    },
    next() {
        Dispatcher.dispatch({
            type: CalendarActionTypes.NEXT
        })
    },
    fix() {
        Dispatcher.dispatch({
            type: CalendarActionTypes.FIX
        })
    }
};


export default Actions;
