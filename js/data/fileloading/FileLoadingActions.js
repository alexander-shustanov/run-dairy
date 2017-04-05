/**
 * Created by alexander on 04.04.17.
 */

'use strict';

import FileLoadingActionTypes from './FileLoadingActionTypes';

import Dispatcher from '../RecordDispatcher';


const FileLoadingActions = {
    updateLoadFiles(files) {
        Dispatcher.dispatch({
            type: FileLoadingActionTypes.UPDATE_LOAD_FILES,
            files
        });
    },
    fileLoaded(file) {
        Dispatcher.dispatch({
            type: FileLoadingActionTypes.FILE_LOADED,
            file
        });
    }
};

export default FileLoadingActions;
