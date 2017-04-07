/**
 * Created by alexander on 28.03.17.
 */

'use strict';

import React from 'react';

import {DateInput, TextInput, Spinner, FileInput, Rating} from './Form';

function NewCompetitionForm(props) {
    let createCompetition = () => {};
    return (
        <form className="new_record_form">
            <h2>Create new competition</h2>

            <DateInput
                onChange={() => {}}
                dateDialogState={props.dialogs.date}
                validator={val => val != null}
            />

            <button className="raised_button" type="button" onClick={createCompetition}><span/>create</button>
        </form>
    );
}

export default NewCompetitionForm;
