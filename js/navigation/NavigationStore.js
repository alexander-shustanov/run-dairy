/**
 * Created by alexander on 08.03.17.
 */

import {ReduceStore} from 'flux/utils';
import Dispatcher from '../data/RecordDispatcher';
import Immutable from 'immutable';
import NavigationActionTypes from './NavigationActionTypes';
import NavigationRoutes from './NavigationRoutes';

class NavigationStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return Immutable.Stack([{route: NavigationRoutes.CALENDAR, params: null}]);
    }

    reduce(state, action) {
        switch (action.type) {
            case NavigationActionTypes.GOTO:
                return state.push({route:action.route, params: action.params});
            case NavigationActionTypes.BACK:
                if(state.size > 1) {
                    return state.pop();
                } else {
                    return state;
                }
            case NavigationActionTypes.REPLACE:
                return state.pop().push({route:action.route, params: action.params});
            default:
                return state;
        }
    }

}

export default new NavigationStore();
