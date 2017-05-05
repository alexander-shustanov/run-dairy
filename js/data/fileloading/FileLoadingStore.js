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
        return new (Immutable.Record({
            photos: new Immutable.List(),
            tracks: new Immutable.List()
        }))();
    }

    reduce(state, action) {
        switch (action.type) {
            case FileLoadingActionTypes.UPDATE_LOAD_FILES:
                let files = Array.from(action.files);
                let containers = files.map(f => {
                        let container = new FileContainer({
                            file: f,
                            reader: new FileReader(),
                            photos: action.photos
                        });
                        container.reader.onload = () => FileLoadingActions.fileLoaded(container.file, container.photos);
                        container.reader.readAsDataURL(f);
                        return container;
                    }
                );
                return state.set(action.photos ? "photos" : "tracks", new Immutable.List(containers));
            case FileLoadingActionTypes.FILE_LOADED:
                let file = action.file;
                let list = action.photos ? state.photos : state.tracks;
                let loadedFileIndex = list.findIndex(container => container.file == file);
                if (loadedFileIndex == -1) {
                    return state;
                }
                let container = list.get(loadedFileIndex);
                let l = list.set(loadedFileIndex, container.set("loaded", true).set("loading", false).set("content", container.reader.result));
                return state.set(action.photos ? "photos" : "tracks", l);

            default:
                return state;
        }
    }
}

export default new FileLoadingStore();
