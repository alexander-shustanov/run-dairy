/**
 * Created by alexander on 10.03.17.
 */

'use strict';

import React from 'react';
import DateDialogActions from '../dialogs/date/DateDialogActions';
import DateDialogView from '../dialogs/date/DateDialogView';
import RecordActions from '../data/RecordActions';

const months = ["January", "February", "Mart", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function DateInput(props) {
    let dateDialogState = props.dialogs.date;
    let dateDialogVisible = dateDialogState.visible;
    let toggleDialog = () => DateDialogActions.toggle();
    let dateDialogMayBe = dateDialogVisible ? (<DateDialogView dateDialogState={dateDialogState} onDateChanged={(date) => props.editDraft(props.draftRecord.set("date", date))}/>) : [];

    let date = props.draftRecord.date;

    let labelClasses = ["hint_label"];
    let highlightingBarClasses = ["highlight_bar"];
    if(dateDialogVisible) {
        labelClasses.push("hint_label_active");
        highlightingBarClasses.push("highlight_bar_active");
    } else if(date) {
        labelClasses.push("hint_label_not_empty");
    }

    let textDate = !date ? "" : (date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear());

    return (
        <div className="date_form">
            <div className="form_group">
                <input type="text" className="date_dialog_input_target" readOnly="readOnly" onClick={toggleDialog} value={textDate} required="required"/>
                <label className={labelClasses.join(" ")} onClick={toggleDialog}>Date</label>
                <i className={highlightingBarClasses.join(" ")} onClick={toggleDialog}/>
            </div>
            {dateDialogMayBe}
        </div>
    );
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
