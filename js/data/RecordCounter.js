/**
 * Created by alexander on 06.03.17.
 */

'use strict';

if (!localStorage.recordCounter) {
    localStorage.recordCounter = 0;
}
let _counter = parseInt(localStorage.recordCounter);

const RecordCounter = {
    increment() {
        localStorage.recordCounter = _counter;
        _counter++;
        return 'id-' + String(_counter);
    },
};

export default RecordCounter;
