
/**
 * @properties={typeid:35,uuid:"7C1391DD-8CE1-47D4-A62E-2E9E9E1DD003",variableType:-4}
 */
var searchText = null;


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"9DDCFC87-1987-43FD-87A5-257AD43A6F5E"}
 */
function newRecord(event) {
    var rec = foundset.createRecord();
    if (!rec) {
        plugins.dialogs.showErrorDialog('Error', 'Could not create new record.');
        return false;
    }
    return true;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"67031D63-DE43-4223-8199-6E5FB404103E"}
 */
function saveRecord(event) {
    var success = databaseManager.saveData();
    if (success) {
        plugins.dialogs.showInfoDialog('Success', 'Record saved successfully!');
        return true;
    } else {
        plugins.dialogs.showErrorDialog('Error', 'Could not save record.');
        return false;
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"0B50DEBE-AF86-4989-8480-D1BAEEC1CBB3"}
 */
function deleteRecord(event) {
    var response = plugins.dialogs.showQuestionDialog(
        'Delete Record',
        'Delete this record? This cannot be undone.',
        'Yes, Delete',
        'No, Cancel'
    );
    if (response == 'Yes, Delete') {
        var success = foundset.deleteRecord();
        if (success) {
            databaseManager.saveData();
            plugins.dialogs.showInfoDialog('Deleted', 'Record has been deleted.');
        } else {
            plugins.dialogs.showErrorDialog('Error', 'Could not delete record.');
        }
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"9BAA45F9-6EE0-4EBD-871F-81B7F778A373"}
 */
function cancelChanges(event) {
    var editCount = databaseManager.getEditedRecords().length;
    if (editCount > 0) {
        var response = plugins.dialogs.showQuestionDialog(
            'Discard Changes',
            'You have unsaved changes. Discard them?',
            'Yes, Discard',
            'No, Keep Editing'
        );
        if (response == 'Yes, Discard') {
            databaseManager.revertEditedRecords();
            plugins.dialogs.showInfoDialog('Discarded', 'Changes have been discarded.');
        }
    } else {
        plugins.dialogs.showInfoDialog('No Changes', 'No unsaved changes to discard.');
    }
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"F47AC926-C7EC-423B-A626-5DE57334574B"}
 */
function searchRecords(event) {
    plugins.dialogs.showWarningDialog('Search', 'Search not implemented for this form.');
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"6C999F41-8741-4254-BB11-A6C48967B872"}
 */
function clearSearch(event) {
    searchText = '';
    foundset.loadAllRecords();
    plugins.dialogs.showInfoDialog('Cleared', 'Showing all ' + foundset.getSize() + ' records.');
}

/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"B576D7D7-7F13-45B6-A7B5-165083BD100E"}
 */
function onShow(firstShow, event) {
    if (firstShow) {
        foundset.loadAllRecords();
    }
}