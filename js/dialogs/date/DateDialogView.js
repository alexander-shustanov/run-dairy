/**
 * Created by alexander on 12.03.17.
 */

'use strict';

import React from 'react';
import DateDialogActions from './DateDialogActions';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function daysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

function monthFirstDayOffset(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function DateDialog(props) {

    let availableYear = [];

    for(let i = 2007;i<=new Date().getFullYear();i++) {
        availableYear = availableYear.concat(i);
    }

    let dateDialogState = props.dateDialogState;
    let chosenDate = new Date(dateDialogState.chosenDate);
    let curDate = new Date(dateDialogState.curMonth);
    let curYear = curDate.getFullYear();
    let curMonth = curDate.getMonth();
    let choosenWeekDay = chosenDate.getDay();

    let yearChanged = (event) => DateDialogActions.changeCurDate(curDate.setFullYear(parseInt(event.target.value)));
    let nextMonth = () => DateDialogActions.changeCurDate(curDate.setMonth(curDate.getMonth()+1));
    let prevMonth = () => DateDialogActions.changeCurDate(curDate.setMonth(curDate.getMonth()-1));
    let today = () => DateDialogActions.chooseDate(new Date());

    let tableDays = [];
    let firstDayOffset = monthFirstDayOffset(curDate);

    for(let i = -firstDayOffset;i<daysInMonth(curDate);i++) {
        let week = Math.floor((i+firstDayOffset)/7);
        if(!tableDays[week])
            tableDays[week] = [];
        tableDays[week][(i+firstDayOffset)%7] = i < 0 ? "" : i+1;
    }

    let isSelectedDay = (d) => curMonth == chosenDate.getMonth() && curYear == chosenDate.getFullYear() && d == chosenDate.getDate();


    return (
        <div className="date_dialog_container">
            <div className="dialog_dim" onClick={DateDialogActions.toggle}/>
            <div className="date_dialog">
                <div className="date_dialog_header">
                    <div className="date_dialog_chosen_day_of_week">{days[choosenWeekDay]}</div>
                    <div className="date_dialog_chosen_month">{months[curMonth]}</div>
                    <div className="date_dialog_chosen_day">{curDate.getDate()}</div>
                    <div className="date_dialog_chosen_year">{curYear}</div>
                </div>
                <div className="date_dialog_picker">
                    <div className="date_dialog_picker_header">
                        {months[curMonth]} <select className="date_dialog_month_select" onChange={yearChanged}>{availableYear.map(y => {return (<option selected={y == curYear ? "selected" : ""}>{y}</option>)})}</select>
                        <div className="date_dialog_picker_left" onClick={prevMonth}/>
                        <div className="date_dialog_picker_right" onClick={nextMonth}/>
                    </div>
                    <table className="date_dialog_picker_table">
                        <thead><tr>{days.map(d=>(<th className="date_dialog_picker_table_header_item">{d[0]}</th>))}</tr></thead>
                        <tbody>
                        {tableDays.map(week => <tr>{week.map(d => <td><div
                            className={"date_dialog_picker_table_item " + (isSelectedDay(d) ? "date_dialog_picker_table_item_selected" : "")}
                            onClick={() => DateDialogActions.chooseDate(new Date(curDate.getFullYear(), curDate.getMonth(), d))}>{d}</div></td>)}</tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="date_dialog_footer">
                    <button type='button' className="flat_button date_dialog_today" onClick={today}>Today</button>
                    <button type='button' className="flat_button">Clear</button>
                    <button type='button' className="flat_button date_dialog_close" onClick={DateDialogActions.toggle}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default DateDialog;
