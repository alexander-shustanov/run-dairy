/**
 * Created by alexander on 04.04.17.
 */

'use strict';

import FileLoadingActionTypes from './FileLoadingActionTypes';

import Dispatcher from '../RecordDispatcher';


const FileLoadingActions = {
    updateLoadFiles(files, photos) {
        Dispatcher.dispatch({
            type: FileLoadingActionTypes.UPDATE_LOAD_FILES,
            files,
            photos
        });
    },
    fileLoaded(file, photos) {
        Dispatcher.dispatch({
            type: FileLoadingActionTypes.FILE_LOADED,
            file,
            photos
        });
    }
};

export default FileLoadingActions;
