/**
 * Created by alexander on 06.03.17.
 */
'use strict';

import Immutable from 'immutable';

const Record = Immutable.Record({
    id: '',
    date: null,
    distance: 0,
    weather: null,
    photos: null,
    track: null
});

export default Record;
