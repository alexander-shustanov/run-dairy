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
    let dateDialogMayBe = dateDialogVisible ? (<DateDialogView dateDialogState={dateDialogState}
                                                               onDateChanged={(date) => props.editDraft(props.draftRecord.set("date", date))}/>) : [];

    let date = props.draftRecord.date;

    let labelClasses = ["hint_label"];
    let highlightingBarClasses = ["highlight_bar"];
    if (dateDialogVisible) {
        labelClasses.push("hint_label_active");
        highlightingBarClasses.push("highlight_bar_active");
    } else if (date) {
        labelClasses.push("hint_label_not_empty");
    }

    let textDate = !date ? "" : (date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear());

    return (
        <div className="date_form">
            <div className="form_group">
                <input type="text" className="date_dialog_input_target" readOnly="readOnly" onClick={toggleDialog}
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
    if (props.value) {
        labelClasses.push("hint_label_not_empty");
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
            <i className="highlight_bar"/>
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
    return (
        <form className="new_record_form">
            <DateInput {...props}/>
            <TextInput
                type="number"
                name="Distance, km"
                value={record.distance}
                onChange={distance => props.editDraft(record.set("distance", distance))}
                min={0}
                max={42}
                digitsAfterZero={3}
            />
            <TextInput
                type="number"
                name="Temperature, °C"
                value={weather.temperature}
                onChange={temperature => props.editDraft(record.set("weather", weather.set("temperature", temperature)))}
                min={-273}
                digitsAfterZero={1}
            />
            <TextInput
                type="number"
                name="Humidity, %"
                value={weather.humidity}
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
                onSelect={dif => props.editDraft(record.set("difficulty", dif))}
            />

        </form>
    );
}


export default NewRecordForm;
