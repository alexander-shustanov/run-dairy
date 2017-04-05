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
import StatisticsView from './StatisticsView';
import CompetitionsMainView from './CompetitionsMainView';
import Toolbar from './Toolbar';
import DateUtils from '../data/DateUtils';

function AppView(props) {

    let curView;
    let title;

    switch (props.route) {
        case NavigationRoutes.CALENDAR:
            curView = <Calendar {...props}/>;
            break;
        case NavigationRoutes.STATISTICS:
            curView = <StatisticsView {...props}/>;
            break;
        case NavigationRoutes.COMPETITIONS:
            curView = <CompetitionsMainView {...props}/>;
            break;
        case NavigationRoutes.RUN_CREATION_FORM:
            curView = <NewRecordForm {...props}/>;
            title = "New run record";
            break;
        case NavigationRoutes.DAY_LIST:
            curView = <RecordList {...props}/>;
            title = "Runs at " + DateUtils.printDate(props.navigationParams);
            break;
    }

    return (
        <div>
            <Toolbar route={props.route} showBack={props.showBack} title={title}/>
            <div className="paper">
                {curView}
            </div>
            <div id="fab_container">
                <NewRecordFab />
            </div>
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
