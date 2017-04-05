/**
 * Created by alexander on 05.04.17.
 */

'use strict';

if (!localStorage.competitionCounter) {
    localStorage.competitionCounter = 0;
}
let _counter = parseInt(localStorage.competitionCounter);

const CompetitionCounter = {
    increment() {
        _counter++;
        localStorage.competitionCounter = _counter;
        return 'id-' + String(_counter);
    },
};

export default CompetitionCounter;
