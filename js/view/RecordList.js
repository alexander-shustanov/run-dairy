/**
 * Created by alexander on 21.03.17.
 */

'use strict';

import React from 'react';


const months = ["January", "February", "Mart", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function TextField(props) {
    return <div className="record_list_item_field">
        <div><h3>{props.name}</h3></div>
        <div>{props.value}</div>
    </div>;
}

function RecordView(props) {
    let record = props.record;
    let weather = record.weather;

    let date = new Date(props.record.date);
    let textDate = (date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear());

    return <div>
        <TextField name="Date" value={textDate}/>
        <TextField name="Time" value={record.time + " min"}/>
        <TextField name="Distance" value={record.distance + " km"}/>
        <TextField name="Temperature" value={weather.temperature + " °C"}/>
        <TextField name="Humidity" value={weather.humidity + " %"}/>
        {record.photos.map(photo => <img src={photo}/>)}
    </div>;
}

function RecordList(props) {
    let date = props.navigationParams;

    let curRecords = (record) => {
        let recordDate = new Date(record.date);
        if (recordDate.getFullYear() != date.getFullYear()) {
            return false;
        }
        if (recordDate.getMonth() != date.getMonth()) {
            return false;
        }
        return recordDate.getDate() == date.getDate();

    };

    let records = Array.from(props.records.values()).filter(curRecords).map(record => (<RecordView record={record}/>));
    let elems = [];

    for (let i = records.length - 1; i > 0; i--) {
        elems.push(records[i]);
        elems.push(<hr/>);
    }
    if (records.length != 0) {
        elems.push(records[0]);
    }

    return <div>{elems}</div>;
}

export default RecordList;
