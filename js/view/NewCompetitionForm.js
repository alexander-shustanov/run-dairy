/**
 * Created by alexander on 28.03.17.
 */

'use strict';

import React from 'react';
import CompetitionActions from '../data/competition/CompetitionActions';

import {DateInput, TextInput, Spinner, FileInput, Rating} from './Form';

function NewCompetitionForm(props) {
    let draft = props.competitionDraft;

    if(!draft.result) {
        draft = draft.set("result", "Did not participate");
    }
    if(!draft.city) {
        draft = draft.set("city", props.cities.get(0));
    }

    let allGood = draft.date != null && draft.result != null && draft.city != null && (draft.result == "Did not participate" || draft.time != null);

    let createCompetition = () => {
        if(allGood) {
            CompetitionActions.addCompetition(draft);
            props.back();
        } else {
            CompetitionActions.showCompetitionDraftError();
        }
    };

    let timeInput = draft.result != "Did not participate" ? <TextInput
        type="number"
        name="Time, minutes"
        value={draft.time}
        onChange={time => CompetitionActions.editCompetitionDraft(draft.set("time", time))}
        validator={val => val != null}
        showError={props.showCompetitionError}
        min={0}
        digitsAfterZero={0}
    /> : [];

    return (
        <form className="new_record_form">
            <h2>Create new competition</h2>

            <DateInput
                date={draft.date}
                onChange={date => CompetitionActions.editCompetitionDraft(draft.set("date", date))}
                dateDialogState={props.dialogs.date}
                showError={props.showCompetitionError}
                validator={val => val != null}
            />

            <Spinner
                name="Result"
                value={draft.result}
                onChange={result => CompetitionActions.editCompetitionDraft(draft.set("result", result))}
                opts={["First place", "Second place", "Third place", "Loose", "Did not participate"]}
                showError={props.showCompetitionError}/>

            <Spinner
                name="City"
                value={draft.city}
                validator={val => val != null}
                opts={Array.from(props.cities.values())}
                showError={props.showCompetitionError}
                onChange={city => CompetitionActions.editCompetitionDraft(draft.set("city", city))}
            />

            {timeInput}

            <button className="raised_button" type="button" onClick={createCompetition}><span/>{draft.id ? "update" : "create"}</button>
        </form>
    );
}

export default NewCompetitionForm;
