/**
 * Created by alexander on 08.03.17.
 */

'use strict';
import NavigationActionTypes from './NavigationActionTypes';
import Dispatcher from '../data/RecordDispatcher';

const Actions = {
    goto(route) {
        Dispatcher.dispatch({
            type: NavigationActionTypes.GOTO,
            route
        });
    },
    replace(route) {
        Dispatcher.dispatch({
            type: NavigationActionTypes.REPLACE,
            route
        });
    },
    back() {
        Dispatcher.dispatch({
            type: NavigationActionTypes.BACK
        });
    }
};

export default Actions;
