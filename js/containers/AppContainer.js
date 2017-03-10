/**
 * Created by alexander on 06.03.17.
 */

import {Container} from 'flux/utils';
import AppView from '../view/AppView';
import RecordStore from '../data/RecordStore';
import DraftRecordStore from '../data/DraftRecordStore';
import RecordActions from '../data/RecordActions';
import CalendarStore from '../data/calendar/CalendarStore';

function getStores() {
    return [RecordStore, DraftRecordStore, CalendarStore];
}

function getStates() {
    return {
        records: RecordStore.getState(),
        draftRecord: DraftRecordStore.getState(),
        calendar: CalendarStore.getState(),

        editDraft: RecordActions.editRecordDraft,
        addRecord: RecordActions.addRecord
    };
}

export default Container.createFunctional(AppView, getStores, getStates);
