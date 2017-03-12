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
        return Immutable.Stack([NavigationRoutes.CALENDAR]);
    }

    reduce(state, action) {
        switch (action.type) {
            case NavigationActionTypes.GOTO:
                return state.push(action.route);
            case NavigationActionTypes.BACK:
                return state.pop();
            case NavigationActionTypes.REPLACE:
                return state.pop().push(action.route);
            default:
                return state;
        }
    }

}

export default new NavigationStore();
