/**
 * Created by alexander on 10.03.17.
 */

'use strict';

import React from 'react';
import RecordActions from '../data/RecordActions';
import FileLoadingActions from '../data/fileloading/FileLoadingActions';
import Immutable from 'immutable';
import {DateInput, TextInput, Spinner, FileInput, Rating} from './Form';

function NewRecordForm(props) {
    let loadingStates = props.files;
    let photos = loadingStates.photos;

    let record = props.draftRecord;
    let weather = record.weather;

    let validate = props.validator;

    let allGood =
        validate("time", record.time) &&
        validate("date", record.date) &&
        validate("humidity", weather.humidity) &&
        validate("temperature", weather.temperature);

    let createRecord = () => {
        if (allGood) {
            props.addRecord(record.set("photos", photos.map(container => container.content)));
            props.back();
        } else {
            props.showError();
        }
    };

    return (
        <form className="new_record_form">

            <h2>Create new run record</h2>

            <DateInput
                date={record.date}
                onChange={date => props.editDraft(record.set("date", date))}
                dateDialogState={props.dialogs.date}
                showError={props.withError}
                validator={props.validator.bind(null, "date")}
            />
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
                opts={[1, 5, 10, 21, 42]}
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
                opts={["Clear", "Snow", "Rain"]}
                name="Precipitations"
            />
            <Rating
                name="Difficulty"
                value={record.difficulty}
                validator={props.validator}
                showError={props.withError}
                onSelect={dif => props.editDraft(record.set("difficulty", dif))}
            />
            <FileInput
                value={photos.map(container => container.file)}
                name="Images"
                multiple={true}
                onChange={photos => FileLoadingActions.updateLoadFiles(photos)}
            />
            <button className="raised_button" type="button" onClick={createRecord}><span/>create</button>

        </form>
    );
}


export default NewRecordForm;
