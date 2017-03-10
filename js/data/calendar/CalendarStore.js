/**
 * Created by alexander on 09.03.17.
 */

'use strict';

import {ReduceStore} from 'flux/utils';
import Dispatcher from '../RecordDispatcher';
import CalendarState from './CalendarState';
import CalendarActionTypes from './CalendarActionTypes';


class CalendarStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return new CalendarState();
    }

    reduce(state, action) {
        switch (action.type) {
            case CalendarActionTypes.NEXT: {
                let newDate = new Date(state.date.getTime());
                newDate.setMonth(newDate.getMonth() + 1);
                return state.set("date", newDate).set("isNext", true).set("isPrev", false);
            }
            case CalendarActionTypes.PREV: {
                let newDate = new Date(state.date.getTime());
                newDate.setMonth(newDate.getMonth() - 1);
                return state.set("date", newDate).set("isNext", false).set("isPrev", true);
            }
            case CalendarActionTypes.FIX:
                return state.set("isNext", false).set("isPrev", false);
            default:
                return state;
        }
    }
}

export default new CalendarStore;
