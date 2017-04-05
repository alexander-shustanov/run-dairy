/**
 * Created by alexander on 05.04.17.
 */


'use strict';

import ActionTypes from './CompetitionActionTypes';
import Dispatcher from '../RecordDispatcher';

const Actions = {
    addCompetition(competition) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_COMPETITION,
            competition
        });
    },
    deleteCompetition(id) {
        Dispatcher.dispatch({
            type: ActionTypes.DELETE_COMPETITION,
            id
        });
    },
    editCompetitionDraft(competition) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_DRAFT_COMPETITION,
            competition
        });
    },
    showCompetitionDraftError() {
        Dispatcher.dispatch({
            type: ActionTypes.SHOW_COMPETITION_ERROR
        });
    }
};

export default Actions;
