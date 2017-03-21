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

function AppView(props) {

    let curView;

    switch(props.route) {
        case NavigationRoutes.CALENDAR:
            curView = <Calendar {...props}/>;
            break;
        case NavigationRoutes.RUN_CREATION_FORM:
            curView = <NewRecordForm {...props}/>
            break;
        case NavigationRoutes.DAY_LIST:
            curView = <RecordList {...props}/>
            break
    }

    const noRecords = props.records.size == 0;

    return (
        <div>
            <NavBar {...props} />
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
    return (
        <div id="nav_bar"/>
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
