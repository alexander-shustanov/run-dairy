/**
 * Created by alexander on 05.04.17.
 */
'use strict';

import {ReduceStore} from 'flux/utils';
import RecordDispatcher from '../RecordDispatcher';
import Immutable from 'immutable';
import CompetitionActionTypes from './CompetitionActionTypes';
import CompetitionCounter from './CompetitionCounter';
import Competition from './Competition';
import NavigationActionTypes from '../../navigation/NavigationActionTypes';
import NavigationRoutes from '../../navigation/NavigationRoutes';

class CompetitionStore extends ReduceStore {
    constructor() {
        super(RecordDispatcher);
    }

    getInitialState() {
        let state = new (Immutable.Record({
            competitions: Immutable.OrderedMap(),
            draft: new Competition(),
            showError: false
        }))();
        if (localStorage.competitionStore) {
            JSON
                .parse(localStorage.competitionStore)
                .map(competition => new Competition(competition))
                .map(competition => competition.set("date", new Date(competition.date)))
                .forEach(competition => state = state.set("competitions" , state.competitions.set(competition.id, competition)));
        }
        return state;
    }

    reduce(state, action) {
        switch (action.type) {
            case CompetitionActionTypes.ADD_COMPETITION:
                let competition = action.competition;
                if (!competition.id) {
                    competition = competition.set("id", CompetitionCounter.increment());
                }
                let newState = state
                    .set("draft", new Competition())
                    .set("competitions", state.competitions.set(competition.id, competition))
                    .set("showError", false);
                return CompetitionStore.save(newState);
            case CompetitionActionTypes.UPDATE_DRAFT_COMPETITION:
                return state.set("draft", action.competition);
            case CompetitionActionTypes.SHOW_COMPETITION_ERROR:
                return state.set("showError", true);
            case CompetitionActionTypes.EDIT_COMPETITION:
                return state.set("draft", action.competition);
            case NavigationActionTypes.GOTO:
            case NavigationActionTypes.REPLACE:
                if(action.route != NavigationRoutes.COMPETITION_CREATION_FORM) {
                    return state.set("draft", new Competition());
                }
                return state;
            case NavigationActionTypes.BACK:
                return state.set("draft", new Competition());
            default:
                return state;
        }
    }

    static save(state) {
        localStorage.competitionStore = JSON
            .stringify(Array.from(state.competitions.values())
                .map(CompetitionStore.competitionToJs)
            );
        return state;
    }

    static competitionToJs(competition) {
        return {
            id: competition.id,
            date: competition.date.getTime(),
            result: competition.result,
            city: competition.city
        }
    }
}

export default new CompetitionStore();
