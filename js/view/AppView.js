/**
 * Created by alexander on 06.03.17.
 */

'use strict';

import React from 'react';
import NavigationRoutes from '../navigation/NavigationRoutes';
import Calendar from './CalendarView';
import NavigationActions from '../navigation/NavigationActions';
import NewRecordForm from './NewRecordForm';

function AppView(props) {

    let curView;

    switch(props.route) {
        case NavigationRoutes.CALENDAR:
            curView = <Calendar {...props}/>;
            break;
        case NavigationRoutes.RUN_CREATION_FORM:
            curView = <NewRecordForm {...props}/>
            break;
    }

    const noRecords = props.records.size == 0;
    const recordsList = noRecords ? "No records" : props.records.size;

    //{/*<NewRecord*/}
      //  {/*onEditDraft={props.editDraft}*/}
        //{/*onDone={props.addRecord}*/}
        //{/*draft={props.draftRecord}*/}
    // />
    // {[...props.records.values()].map(
    //     record => (
    //         <RecordView
    //             distance={record.distance}
    //             key={record.id}
    //         />
    //     ))}

    return (
        <div>
            <NavBar {...props} />
            <div className="paper">
                {curView}
            </div>
            <NewRecordFab />
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


const ENTER_KEY_CODE = 13;
function NewRecord(props) {
    const onChange = (event) => props.onEditDraft(event.target.value);
    const addRecord = () => props.onDone(props.draft);
    const onBlur = () => addRecord();
    const onKeyDown = (event) => {
        if (event.keyCode === ENTER_KEY_CODE) {
            addRecord();
        }
    };

    return (
        <input
            autoFocus={true}
            id="new_record"
            placeholder="What needs to be done?"
            value={props.draft.distance}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
}


export default AppView;
