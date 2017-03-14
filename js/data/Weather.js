/**
 * Created by alexander on 14.03.17.
 */

'use strict';

import Immutable from 'immutable';

const Weather = Immutable.Record({
    temperature: null,
    humidity: null,
    precipitation: null
});

export default Weather;
