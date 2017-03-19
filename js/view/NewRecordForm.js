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
    let date = props.draftRecord.date;

    let dateDialogState = props.dialogs.date;
    let dateDialogVisible = dateDialogState.visible;
    let toggleDialog = () => DateDialogActions.toggle(date);

    let dateDialogMayBe = dateDialogVisible ? (<DateDialogView dateDialogState={dateDialogState}
                                                               onDateChanged={(date) => props.editDraft(props.draftRecord.set("date", date))}/>) : [];

    let labelClasses = ["hint_label"];
    let highlightingBarClasses = ["highlight_bar"];
    if (dateDialogVisible) {
        labelClasses.push("hint_label_active");
        highlightingBarClasses.push("highlight_bar_active");
    } else if (date) {
        labelClasses.push("hint_label_not_empty");
    }

    if(props.withError && !props.validator("date", date)) {
        labelClasses.push("hint_label_error");
        highlightingBarClasses.push("highlight_bar_error");
    }

    let textDate = !date ? "" : (date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear());

    return (
        <div className="date_form">
            <div className="form_group">
                <input type="text" className="date_dialog_input_target" readOnly="readOnly" onClick={toggleDialog} onFocus={toggleDialog}
                       value={textDate} required="required"/>
                <label className={labelClasses.join(" ")} onClick={toggleDialog}>Date</label>
                <i className={highlightingBarClasses.join(" ")} onClick={toggleDialog} />
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

    if(props.showError && !props.validator(props.value)) {
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
                {props.opts.map(val => <option value={val} selected={val == props.value ? "selected" : ""}>{val}</option>)}
            </select>
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
                {[1,2,3,4,5].map(i => <div className="star_container"><div className={props.value >= i ? "rating_star" : "rating_star_checked" } onClick={() => props.onSelect(i)}/></div>)}
            </div>
            <label className={labelClasses.join(" ")}>{props.name}</label>
        </div>
    );
}



function NewRecordForm(props) {
    let record = props.draftRecord;
    let weather = record.weather;

    let validate = props.validator;

    let allGood = validate("time", record.time) && validate("date", record.date);

    let createRecord = () => {
        if(allGood) {
            props.addRecord(record);
            props.back();
        } else {
            props.showError();
        }
    };

    return (
        <form className="new_record_form">

            <h2>Create new run record</h2>

            <DateInput {...props}/>
            <TextInput
                type="number"
                name="Time, minutes"
                value={record.time}
                onChange={time => props.editDraft(record.set("time", time))}
                validator={props.validator.bind(null, "time")}
                showError={props.withError}
                min={0}
                digitsAfterZero={0}
            />
            <Spinner
                onChange={distance => props.editDraft(record.set("distance", distance))}
                value={record.distance}
                opts={[1,5, 10,21,42]}
                name="Distance, km"
            />
            <TextInput
                type="number"
                name="Temperature, °C"
                value={weather.temperature}
                validator={props.validator.bind(null, "temperature")}
                showError={props.withError}
                onChange={temperature => props.editDraft(record.set("weather", weather.set("temperature", temperature)))}
                min={-273}
                digitsAfterZero={1}
            />
            <TextInput
                type="number"
                name="Humidity, %"
                value={weather.humidity}
                validator={props.validator.bind(null, "humidity")}
                showError={props.withError}
                onChange={humidity => props.editDraft(record.set("weather", weather.set("humidity", humidity)))}
                min={0}
                max={100}
                digitsAfterZero={1}
            />
            <Spinner
                onChange={precipitation => props.editDraft(record.set("weather", weather.set("precipitation", precipitation)))}
                value={weather.precipitation}
                opts={["Clear","Snow", "Rain"]}
                name="Precipitations"
            />
            <Rating
                name="Difficulty"
                value={record.difficulty}
                validator={props.validator}
                showError={props.withError}
                onSelect={dif => props.editDraft(record.set("difficulty", dif))}
            />
            <button className="raised_button" type="button" onClick={createRecord}><span/>create</button>

        </form>
    );
}


export default NewRecordForm;
