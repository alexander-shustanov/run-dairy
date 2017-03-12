/**
 * Created by alexander on 10.03.17.
 */

'use strict';

import React from 'react';
import DateDialogActions from '../dialogs/date/DateDialogActions';
import DateDialogView from '../dialogs/date/DateDialogView';

function DateInput(props) {
    let dateDialogState = props.dialogs.date;
    let dateDialogVisible = dateDialogState.visible;
    let toggleDialog = () => DateDialogActions.toggle();
    let dateDialogMayBe = dateDialogVisible ? (<DateDialogView dateDialogState={dateDialogState}/>) : [];

    return (
        <div>
            {dateDialogMayBe}
            <input type="text" className="date_dialog_input_target" onClick={toggleDialog} readOnly="readOnly"/>
        </div>
    );
    // return (
    //
    // );
}

function NewRecordForm(props) {
    // let changeDate = (event) => props.editDraft(props.draftRecord.set("date", event.target.value));

    return (
        <form className="new_record_form">
            <DateInput {...props}/>

        </form>
    );
}


export default NewRecordForm;
