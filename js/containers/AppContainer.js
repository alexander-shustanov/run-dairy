/**
 * Created by alexander on 06.03.17.
 */

import {Container} from 'flux/utils';
import AppView from '../view/AppView';
import RecordStore from '../data/RecordStore';
import DraftRecordStore from '../data/DraftRecordStore';
import RecordActions from '../data/RecordActions';
import CalendarStore from '../data/calendar/CalendarStore';
import FileLoadingStore from '../data/fileloading/FileLoadingStore';
import CompetitionStore from '../data/competition/CompetitionStore';
import NavigationStore from '../navigation/NavigationStore';
import NavigationActions from '../navigation/NavigationActions';
import NavigationRoutes from '../navigation/NavigationRoutes';
import DateDialogStore from '../dialogs/date/DateDialogStore';
import CityStore from '../data/city/CityStore';

function getStores() {
    return [RecordStore, DraftRecordStore, CalendarStore, NavigationStore, DateDialogStore, FileLoadingStore, CompetitionStore, CityStore];
}

function getStates() {
    let route = NavigationStore.getState().peek().route;

    return {
        records: RecordStore.getState(),
        draftRecord: DraftRecordStore.getState().record,
        validator: DraftRecordStore.getState().validator,
        withError: DraftRecordStore.getState().showError,
        route: route,
        showBack: route != NavigationRoutes.CALENDAR && route != NavigationRoutes.COMPETITIONS && route != NavigationRoutes.STATISTICS,
        navigationParams: NavigationStore.getState().peek().params,
        calendar: CalendarStore.getState(),
        dialogs: {
            date: DateDialogStore.getState()
        },
        files: {
            photos: FileLoadingStore.getState().toJS()
        },
        competitions: CompetitionStore.getState().competitions,
        competitionDraft: CompetitionStore.getState().draft,
        showCompetitionError: CompetitionStore.getState().showError,
        cities: CityStore.getState().cities,

        editDraft: RecordActions.editRecordDraft,
        addRecord: RecordActions.addRecord,
        showError: RecordActions.showError,
        goto: NavigationActions.goto,
        back: NavigationActions.back,
        replaceRoute: NavigationActions.replace
    };
}

export default Container.createFunctional(AppView, getStores, getStates);
