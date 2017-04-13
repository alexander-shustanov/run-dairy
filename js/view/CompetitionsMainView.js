/**
 * Created by alexander on 28.03.17.
 */

'use strict';

import React from 'react';
import CompetitionActions from '../data/competition/CompetitionActions';
import NavigationActions from '../navigation/NavigationActions';
import NavigationRoutes from '../navigation/NavigationRoutes';

const months = ["January", "February", "Mart", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function TextField(props) {
    return <div className="record_list_item_field">
        <div><h3>{props.name}</h3></div>
        <div>{props.value}</div>
    </div>;
}


function CompetitionView(props) {
    let competition = props.competition;
    let date = competition.date;

    let textDate = (date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear());

    let edit = () => {
        CompetitionActions.editCompetition(competition);
        NavigationActions.goto(NavigationRoutes.COMPETITION_CREATION_FORM);
    };

    return (
        <div className="competition_view">
            <button className="back_button edit_button" type="button" onClick={edit}/>
            <TextField name="Date" value={textDate}/>
            <TextField name="City" value={competition.city}/>
            <TextField name="Result" value={competition.result}/>
            {/*Yes, it looks awful, but I am lazy*/}
            {competition.result == "Did not participate" ? [] :
                <TextField name="Time" value={competition.time + " min"}/>}
        </div>
    );
}

function CompetitionsMainView(props) {
    let today = new Date();
    today.setDate(today.getDate() + 1);

    let createCompView = competition => <CompetitionView competition={competition}/>;

    let competitions = Array.from(props.competitions.values());
    let upcoming = competitions.filter(competition => competition.date.getTime() > today.getTime()).map(createCompView);
    let previous = competitions.filter(competition => competition.date.getTime() <= today.getTime()).map(createCompView);

    let upcomingWithHr = [];
    let previousWithHr = [];

    let fillWithHr = (upcomingWithHr, upcoming) => {
        if(upcoming.length == 0) {
            return;
        }
        for (let i = upcoming.length - 1; i > 0; i--) {
            upcomingWithHr.push(upcoming[i]);
            upcomingWithHr.push(<hr/>);
        }
        upcomingWithHr.push(upcoming[0]);
    };
    fillWithHr(upcomingWithHr, upcoming);
    fillWithHr(previousWithHr, previous);

    return (
        <div>
            {upcomingWithHr.length > 0 ? <h2>Upcoming competitions</h2> : []}
            {upcomingWithHr}
            {previousWithHr.length > 0 ? <h2>Previous competitions</h2> : []}
            {previousWithHr}
        </div>
    );
}

export default CompetitionsMainView;
