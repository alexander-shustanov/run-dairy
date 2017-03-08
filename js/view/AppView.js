/**
 * Created by alexander on 06.03.17.
 */

'use strict';

import React from 'react';

function AppView(props) {
    const noRecords = props.records.size == 0;
    const recordsList = noRecords ? "No records" : props.records.size;

    return (
        <div>
            <NavBar {...props} />
            <div className="paper">
                <NewRecord
                    onEditDraft={props.editDraft}
                    onDone={props.addRecord}
                    draft={props.draftRecord}
                />
                {[...props.records.values()].map(
                    record => (
                        <RecordView
                            distance={record.distance}
                            key={record.id}
                        />
                    ))}
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
    return (
        <div id="add_record_fab"/>
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
