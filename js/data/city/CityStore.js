/**
 * Created by alexander on 07.04.17.
 */

'use strict';

import {ReduceStore} from 'flux/utils';
import RecordDispatcher from '../RecordDispatcher';
import Immutable from 'immutable';
import CityActionTypes from './CityActionTypes';
import Actions from './CityActions';

class CityStore extends ReduceStore {
    constructor() {
        super(RecordDispatcher);

        let request = new XMLHttpRequest();
        request.open('GET','cities.json', true);
        request.onreadystatechange = () => {
            if(request.readyState == 4) {
                Actions.updateCitiesList(JSON.parse(request.responseText).cities);
            }
        };

        request.send();
    }

    getInitialState() {
        return new (Immutable.Record({
            cities: new Immutable.List(),
        }))();
    }

    reduce(state, action) {
        switch (action.type) {
            case CityActionTypes.UPDATE_CITY_LIST:
                return state.set("cities", new Immutable.List(action.list));
            default:
                return state;
        }
    }
}

export default new CityStore();
