/**
 * Created by alexander on 06.03.17.
 */

import {Container} from 'flux/utils';
import AppView from '../view/AppView';
import RecordStore from '../data/RecordStore';
import DraftRecordStore from '../data/DraftRecordStore';
import RecordActions from '../data/RecordActions';
import CalendarStore from '../data/calendar/CalendarStore';
import NavigationStore from '../navigation/NavigationStore';
import NavigationActions from '../navigation/NavigationActions';
import DateDialogStore from '../dialogs/date/DateDialogStore';

function getStores() {
    return [RecordStore, DraftRecordStore, CalendarStore, NavigationStore, DateDialogStore];
}

function getStates() {
    return {
        records: RecordStore.getState(),
        draftRecord: DraftRecordStore.getState(),
        route: NavigationStore.getState().peek(),
        calendar: CalendarStore.getState(),
        dialogs: {
            date: DateDialogStore.getState()
        },

        editDraft: RecordActions.editRecordDraft,
        addRecord: RecordActions.addRecord,
        goto: NavigationActions.goto,
        back: NavigationActions.back,
        replaceRoute: NavigationActions.replace
    };
}

export default Container.createFunctional(AppView, getStores, getStates);
