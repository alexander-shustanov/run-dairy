/**
 * Created by alexander on 09.03.17.
 */

import Immutable from 'immutable';
import CalendarActions from './CalendarActions';

const CalendarState = Immutable.Record({
    date: Date.now(),
    isPrev: false,
    isNext: false,

    prev: CalendarActions.prev,
    next: CalendarActions.next,
    fix: CalendarActions.fix
});


export default CalendarState;
