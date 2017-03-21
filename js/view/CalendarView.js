/**
 * Created by alexander on 09.03.17.
 */

'use strict';

import React from 'react';
import NavigationActions from '../navigation/NavigationActions';
import NavigationRoutes from '../navigation/NavigationRoutes';

const months = ["January", "February", "Mart", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function MonthView(props) {
    let calendarState = props.calendar;

    let days = [];
    let days_count = 31;
    for (let i = 1; i <= days_count; i++) {
        days = days.concat(i);
    }

    let date = new Date(calendarState.date);
    let month = date.getMonth();
    let year = date.getFullYear();
    let firstDay = date.setDate(1);
    let dayOfTheWeek = date.getDay();

    let daysWithRecords = Array
        .from(props.records.values())
        .map(record => new Date(record.date))
        .filter(date => date.getFullYear() == year && date.getMonth() == month)
        .map(date => date.getDate());

    let openDay = (day) => {
        if(daysWithRecords.indexOf(day) != -1) {
            let date = new Date();
            date.setFullYear(year);
            date.setMonth(month);
            date.setDate(day);
            NavigationActions.goto(NavigationRoutes.DAY_LIST, date);
        }
    };

    let fakeDays = [];
    for (let i = 1; i < dayOfTheWeek; i++) {
        fakeDays.push(<div className="calendar_day"/>);
    }

    let classes = "calendar_content";
    if (props.prev) {
        classes = classes.concat(" calendar_content_prev");
    }
    if (props.next) {
        classes = classes.concat(" calendar_content_next");
    }
    if (props.appearence) {
        classes = classes.concat(" calendar_content_appear");
    }
    return (
        <div className={classes}>
            {fakeDays}
            {days.map(i => (<div className={"calendar_day" + (daysWithRecords.indexOf(i) != -1 ? " calendar_day_with_record" : "")} key={i}><div onClick={() => openDay(i)}>{i}</div></div>))}
        </div>
    );
}

function Calendar(props) {
    let calendarState = props.calendar;
    let date = new Date(calendarState.date);
    let month = months[date.getMonth()] + " " + date.getFullYear();

    let fixDelayed = () => setTimeout(calendarState.fix, 400);

    let contents = [];
    if (calendarState.isPrev) {
        contents = contents.concat(<MonthView prev={true} calendar={calendarState} records={props.records}/>);
        fixDelayed();
    } else if (calendarState.isNext) {
        contents = contents.concat(<MonthView next={true} calendar={calendarState} records={props.records}/>);
        fixDelayed();
    } else {
        contents = contents.concat(<MonthView appearence={true} calendar={calendarState} records={props.records}/>);
    }

    return (
        <div id="calendar">
            <div id="calendar_header">
                <h1>{month}</h1>
                <div id="calendar_header_left" onClick={calendarState.prev}/>
                <div id="calendar_header_right" onClick={calendarState.next}/>
            </div>
            <div id="calendar_content_container">
                {contents}
            </div>
        </div>
    );
}


export default Calendar;
