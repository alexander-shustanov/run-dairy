/**
 * Created by alexander on 06.03.17.
 */

'use strict';

import React from 'react';
import NavigationRoutes from '../navigation/NavigationRoutes';
import Calendar from './CalendarView';
import NavigationActions from '../navigation/NavigationActions';
import NewRecordForm from './NewRecordForm';
import NewCompetitionForm from './NewCompetitionForm';
import RecordList from './RecordList';
import StatisticsView from './StatisticsView';
import CompetitionsMainView from './CompetitionsMainView';
import Toolbar from './Toolbar';
import MapView from './MapView';
import DateUtils from '../data/DateUtils';

function AppView(props) {

    let curView;
    let title;

    let fabRoute = null;

    switch (props.route) {
        case NavigationRoutes.CALENDAR:
            curView = <Calendar {...props}/>;
            fabRoute = NavigationRoutes.RUN_CREATION_FORM;
            break;
        case NavigationRoutes.STATISTICS:
            curView = <StatisticsView {...props}/>;
            break;
        case NavigationRoutes.COMPETITIONS:
            curView = <CompetitionsMainView {...props}/>;
            fabRoute = NavigationRoutes.COMPETITION_CREATION_FORM;
            break;
        case NavigationRoutes.RUN_CREATION_FORM:
            curView = <NewRecordForm {...props}/>;
            title = "New run record";
            break;
        case NavigationRoutes.COMPETITION_CREATION_FORM:
            curView = <NewCompetitionForm {...props}/>;
            title = "New competition";
            break;
        case NavigationRoutes.DAY_LIST:
            curView = <RecordList {...props}/>;
            title = "Runs at " + DateUtils.printDate(props.navigationParams);
            break;
        case NavigationRoutes.MAP:
            curView = <MapView {...props}/>;
            title = "Future competitions map";
            break;
    }

    let fab = (
        <div id="fab_container">
            <NewRecordFab route={fabRoute}/>
        </div>
    );

    return (
        <div>
            <Toolbar route={props.route} showBack={props.showBack} title={title}/>
            <div className="paper">
                {curView}
            </div>
            {fab}
        </div>
    );
}

function NewRecordFab(props) {
    let openCreationForm = props.route ? () => NavigationActions.goto(props.route) : () => {};

    return (
        <div onClick={openCreationForm} className={props.route ? "add_record_fab" : "add_record_fab add_record_fab_hide"}/>
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
