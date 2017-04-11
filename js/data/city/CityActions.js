/**
 * Created by alexander on 11.04.17.
 */

'use strict';

import Dispatcher from '../RecordDispatcher';
import CityActionTypes from './CityActionTypes';

const Actions = {
    updateCityPart(cityPart) {
        Dispatcher.dispatch({
            type: CityActionTypes.SET_CITY_PART,
            cityPart
        });
    },
    updateCitiesList(list) {
        Dispatcher.dispatch({
            type: CityActionTypes.UPDATE_CITY_LIST,
            list
        });
    }
};

export default Actions;
