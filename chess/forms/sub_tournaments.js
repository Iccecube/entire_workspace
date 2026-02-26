
/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"5FFAF476-FBF1-409D-847B-F2999F36BC89"}
 * @override
 */
function newRecord(event) {
    if (!_super.newRecord(event)) return;

    var rec = foundset.getSelectedRecord();
    rec.tournament_name = 'New Tournament';
    rec.start_date = application.getServerTimeStamp();
    rec.status = 'upcoming';
    rec.prize_fund = 0;
    rec.max_participants = 32;

    plugins.dialogs.showInfoDialog('New Tournament', 'Enter details and click Save.');
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"73D91CCC-01F3-4D8F-A51D-4E291E73B3BA"}
 * @override
 */
function saveRecord(event) {
    var rec = foundset.getSelectedRecord();

    if (!rec) {
        plugins.dialogs.showWarningDialog('No Selection', 'No tournament selected.');
        return false;
    }

    if (!rec.tournament_name || rec.tournament_name.trim() == '') {
        plugins.dialogs.showWarningDialog('Required', 'Tournament name is required.');
        return false;
    }
    if (!rec.start_date) {
        plugins.dialogs.showWarningDialog('Required', 'Start date is required.');
        return false;
    }

    return _super.saveRecord(event);
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"572D9270-4A28-4C84-9E09-BADC7BCB9865"}
 * @override
 */
function deleteRecord(event) {
    var rec = foundset.getSelectedRecord();

    if (!rec || !rec.tournament_id) {
        plugins.dialogs.showWarningDialog('No Selection', 'Please select a tournament to delete.');
        return;
    }

    var tName = rec.tournament_name;

    var response = plugins.dialogs.showQuestionDialog(
        'Delete Tournament',
        'Delete ' + tName + '? This cannot be undone.\n\nAll registrations will also be deleted.',
        'Yes, Delete',
        'No, Cancel'
    );

    if (response == 'Yes, Delete') {
        var success = foundset.deleteRecord();
        if (success) {
            databaseManager.saveData();
            plugins.dialogs.showInfoDialog('Deleted', tName + ' has been deleted.');
        } else {
            plugins.dialogs.showErrorDialog('Error', 'Could not delete tournament.');
        }
    }
}


/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"2372B25A-0F67-4E2B-9794-03BD5D9286FE"}
 */
function searchRecords(event) {
    if (!searchText || searchText.trim() == '') {
        plugins.dialogs.showWarningDialog('Search', 'Please enter search text.');
        return;
    }

    var term = '%' + searchText.trim() + '%';

    foundset.find();

    var rec = foundset.getSelectedRecord();
    rec.tournament_name = term;

    foundset.newRecord();
    rec = foundset.getSelectedRecord();
    rec.location = term;

    foundset.newRecord();
    rec = foundset.getSelectedRecord();
    rec.status = term;

    var count = foundset.search();

    if (count > 0) {
        plugins.dialogs.showInfoDialog('Results', 'Found ' + count + ' tournament(s).');
    } else {
        plugins.dialogs.showInfoDialog('No Results', 'No tournaments found matching "' + searchText + '".');
        foundset.loadAllRecords();
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"91326575-8F83-4986-B8CE-E25E1F77C955"}
 * @override
 */
function clearSearch(event) {
    searchText = '';
    _super.clearSearch(event);
}

