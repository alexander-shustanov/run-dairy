/**
 * Created by alexander on 04.04.17.
 */

'use strict';

import {ReduceStore} from 'flux/utils';
import RecordDispatcher from '../RecordDispatcher';
import Immutable from 'immutable';
import FileLoadingActionTypes from './FileLoadingActionTypes';
import FileLoadingActions from './FileLoadingActions';
import FileContainer from './FileContainer';


class FileLoadingStore extends ReduceStore {
    constructor() {
        super(RecordDispatcher);
    }

    getInitialState() {
        return new Immutable.List();
    }

    reduce(state, action) {
        switch (action.type) {
            case FileLoadingActionTypes.UPDATE_LOAD_FILES:
                let files = Array.from(action.files);
                let containers = files.map(f => {
                        let container = new FileContainer({
                            file: f,
                            reader: new FileReader()
                        });
                        container.reader.onload = () => FileLoadingActions.fileLoaded(container.file);
                        container.reader.readAsDataURL(f);
                        return container;
                    }
                );
                return new Immutable.List(containers);
            case FileLoadingActionTypes.FILE_LOADED:
                let file = action.file;
                let loadedFileIndex = state.findIndex(container => container.file == file);
                if(loadedFileIndex == -1) {
                    return state;
                }
                let container = state.get(loadedFileIndex);
                return state.set(loadedFileIndex, container.set("loaded", true).set("loading", false).set("content", container.reader.result));
            default:
                return state;
        }
    }
}

export default new FileLoadingStore();
