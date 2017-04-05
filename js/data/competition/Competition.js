/**
 * Created by alexander on 05.04.17.
 */
'use strict';

import Immutable from 'immutable';

const Competition = Immutable.Record({
    id: '',
    date: null,
    result: null,
    city: null
});

export default Competition;
