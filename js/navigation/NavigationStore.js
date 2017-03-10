/**
 * Created by alexander on 08.03.17.
 */

import {ReduceStore} from 'flux/utils';
import Dispatcher from './RecordDispatcher';
import Immutable from 'immutable';
import NavigatoinActionTypes from './NavigationActionTypes';

class NavigationStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return "Calendar";
    }

}

export default new NavigationStore();
