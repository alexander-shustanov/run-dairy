/**
 * Created by alexander on 04.04.17.
 */
/**
 * Created by alexander on 06.03.17.
 */
'use strict';

import Immutable from 'immutable';

const FileContainer = Immutable.Record({
    reader: null,
    file: null,
    content: null,
    photos: true,
    loaded: false,
    loading: true
});

export default FileContainer;
