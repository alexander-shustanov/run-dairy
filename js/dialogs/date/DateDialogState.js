/**
 * Created by alexander on 12.03.17.
 */

'use strict';

import Immutable from 'immutable';

const DateDialogState = Immutable.Record({
    chosenDate: Date.now(),
    curMonth: Date.now(),
    visible: false
});

export default DateDialogState;
