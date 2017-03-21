/**
 * Created by alexander on 08.03.17.
 */

'use strict';
import NavigationActionTypes from './NavigationActionTypes';
import Dispatcher from '../data/RecordDispatcher';

const Actions = {
    goto(route, params) {
        Dispatcher.dispatch({
            type: NavigationActionTypes.GOTO,
            route,
            params
        });
    },
    replace(route, params) {
        Dispatcher.dispatch({
            type: NavigationActionTypes.REPLACE,
            route,
            params
        });
    },
    back() {
        Dispatcher.dispatch({
            type: NavigationActionTypes.BACK
        });
    }
};

export default Actions;
