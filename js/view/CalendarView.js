/**
 * Created by alexander on 09.03.17.
 */

'use strict';

import React from 'react';

function MonthView(props) {
    let days = [];
    let days_count = 31;
    for (let i = 1; i <= days_count; i++) {
        days = days.concat(i);
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
            {days.map(i => (<div className="calendar_day" key={i}>{i}</div>))}
        </div>
    );
}

function Calendar(props) {
    let calendarState = props.calendar;

    let contents = [];
    if (calendarState.isPrev) {
        contents = contents.concat(<MonthView appearence={true} calendar={calendarState}/>);
        contents = contents.concat(<MonthView prev={true} calendar={calendarState}/>);
    } else if (calendarState.isNext) {
        contents = contents.concat(<MonthView appearence={true} calendar={calendarState}/>);
        contents = contents.concat(<MonthView next={true} calendar={calendarState}/>);
    } else {
        contents = contents.concat(<MonthView calendar={calendarState}/>);
    }

    if (contents.length > 1) {
        setTimeout(calendarState.fix, 300);
    }

    return (
        <div id="calendar">
            <div id="calendar_header">
                <h1>Mart</h1>
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
