/**
 * Created by alexander on 05.04.17.
 */

'use strict';

import RecordActions from '../data/RecordActions';
import DateDialogActions from '../dialogs/date/DateDialogActions';
import DateDialogView from '../dialogs/date/DateDialogView';

import React from 'react';


const months = ["January", "February", "Mart", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function DateInput(props) {
    let date = props.date;

    let dateDialogState = props.dateDialogState;
    let dateDialogVisible = dateDialogState.visible;
    let toggleDialog = () => DateDialogActions.toggle(date);

    let dateDialogMayBe = dateDialogVisible ? (<DateDialogView dateDialogState={dateDialogState}
                                                               onDateChanged={props.onChange}/>) : [];

    let labelClasses = ["hint_label"];
    let highlightingBarClasses = ["highlight_bar"];
    if (dateDialogVisible) {
        labelClasses.push("hint_label_active");
        highlightingBarClasses.push("highlight_bar_active");
    } else if (date) {
        labelClasses.push("hint_label_not_empty");
    }

    if (props.showError && !props.validator(date)) {
        labelClasses.push("hint_label_error");
        highlightingBarClasses.push("highlight_bar_error");
    }

    let textDate = !date ? "" : (date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear());

    return (
        <div className="date_form">
            <div className="form_group">
                <input type="text" className="date_dialog_input_target" readOnly="readOnly" onClick={toggleDialog}
                       onFocus={toggleDialog}
                       value={textDate} required="required"/>
                <label className={labelClasses.join(" ")} onClick={toggleDialog}>Date</label>
                <i className={highlightingBarClasses.join(" ")} onClick={toggleDialog}/>
            </div>
            {dateDialogMayBe}
        </div>
    );
}

function TextInput(props) {
    let labelClasses = ["hint_label"];
    let highlightBarClasses = ["highlight_bar"];
    if (props.value) {
        labelClasses.push("hint_label_not_empty");
    }

    if (props.showError && !props.validator(props.value)) {
        labelClasses.push("hint_label_error");
        highlightBarClasses.push("highlight_bar_error");
    }

    let onChange = (event) => {
        let value = event.target.value;
        if (props.type == "number") {
            let distance = parseFloat(parseFloat(value).toFixed(props.digitsAfterZero));
            if (props.min != null) {
                distance = Math.max(props.min, distance);
            }
            if (props.max) {
                distance = Math.min(props.max, distance);
            }
            props.onChange(distance);
        } else {
            props.onChange(value);
        }
    };

    return (
        <div className="form_group">
            <input type={props.type} value={props.value ? props.value : ""} onChange={onChange}/>
            <label className={labelClasses.join(" ")}>{props.name}</label>
            <i className={highlightBarClasses.join(" ")}/>
        </div>
    );
}

function Spinner(props) {
    let labelClasses = ["hint_label hint_label_not_empty"];

    let onChange = (event) => {
        let index = event.target.selectedIndex;
        props.onChange(props.opts[index]);
    };

    return (
        <div className="form_group">
            <select value={props.value ? props.value : ""} onChange={onChange}>
                {props.opts.map(val => <option value={val}
                                               selected={val == props.value ? "selected" : ""}>{val}</option>)}
            </select>
            <label className={labelClasses.join(" ")}>{props.name}</label>
            <i className="highlight_bar"/>
        </div>
    );
}

function FileInput(props) {
    let labelClasses = ["hint_label hint_label_not_empty"];

    let onChange = (event) => {
        let files = event.target.files;
        props.onChange(files);
    };

    return (
        <div className="form_group">
            <input type="file" multiple={props.multiple ? "multiple" : ""} onChange={onChange}/>
            <label className={labelClasses.join(" ")}>{props.name}</label>
            <i className="highlight_bar"/>
        </div>
    );
}

function Rating(props) {
    let labelClasses = ["hint_label hint_label_not_empty"];

    return (
        <div className="form_group">
            <div className="stars_container">
                {[1, 2, 3, 4, 5].map(i => <div className="star_container">
                    <div className={props.value >= i ? "rating_star" : "rating_star_checked" }
                         onClick={() => props.onSelect(i)}/>
                </div>)}
            </div>
            <label className={labelClasses.join(" ")}>{props.name}</label>
        </div>
    );
}


export {DateInput, TextInput, Spinner, FileInput, Rating};
