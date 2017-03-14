/**
 * Created by alexander on 06.03.17.
 */
'use strict';

import Immutable from 'immutable';
import Weather from './Weather';

const Record = Immutable.Record({
    id: '',
    date: null,
    distance: null,
    weather: new Weather(),
    difficulty: 1,
    photos: null,
    track: null
});

export default Record;
