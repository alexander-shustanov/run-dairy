/**
 * Created by alexander on 06.03.17.
 */

import {Container} from 'flux/utils';
import AppView from '../view/AppView';
import RecordStore from '../data/RecordStore';
import DraftRecordStore from '../data/DraftRecordStore';
import RecordActions from '../data/RecordActions';

function getStores() {
    return [RecordStore, DraftRecordStore];
}

function getStates() {
    return {
        records: RecordStore.getState(),
        draftRecord: DraftRecordStore.getState(),

        editDraft: RecordActions.editRecordDraft,
        addRecord: RecordActions.addRecord
    };
}

export default Container.createFunctional(AppView, getStores, getStates);
