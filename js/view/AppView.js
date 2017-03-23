/**
 * Created by alexander on 06.03.17.
 */

'use strict';

import React from 'react';
import NavigationRoutes from '../navigation/NavigationRoutes';
import Calendar from './CalendarView';
import NavigationActions from '../navigation/NavigationActions';
import NewRecordForm from './NewRecordForm';
import RecordList from './RecordList';
import Toolbar from './Toolbar';
import DateUtils from '../data/DateUtils';

function AppView(props) {

    let curView;
    let title;

    switch (props.route) {
        case NavigationRoutes.CALENDAR:
            curView = <Calendar {...props}/>;
            break;
        case NavigationRoutes.RUN_CREATION_FORM:
            curView = <NewRecordForm {...props}/>;
            title = "New run record";
            break;
        case NavigationRoutes.DAY_LIST:
            curView = <RecordList {...props}/>;
            title = "Runs at " + DateUtils.printDate(props.navigationParams);
            break
    }

    const noRecords = props.records.size == 0;

    return (
        <div>
            <Toolbar route={props.route} showBack={props.showBack} title={title}/>
            {/*<NavBar route={props.route} showBack={props.showBack}/>*/}
            <div className="paper">
                {curView}
            </div>
            <div id="fab_container">
                <NewRecordFab />
            </div>
        </div>
    );
}

function NavBar(props) {
    let backButton = [];
    if (props.showBack) {
        backButton.push(<button className="back_button" type="button" onClick={NavigationActions.back}/>);
    }

    return (
        <div id="nav_bar">
            {backButton}
        </div>
    );
}

function NewRecordFab() {
    let openCreationForm = () => NavigationActions.goto(NavigationRoutes.RUN_CREATION_FORM);

    return (
        <div id="add_record_fab" onClick={openCreationForm}/>
    );
}

function RecordView(props) {
    return (
        <div className="record_item">
            <label>{props.distance}</label>
        </div>
    );
}


export default AppView;
