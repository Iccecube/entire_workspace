
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"507F6255-C72E-494A-B11A-CAD459E47A2E"}
 */
function onAction(event) {
	
	var rec = foundset.getSelectedRecord();

    var success = databaseManager.saveData(rec);
    
    if (success) {
        var win = application.getWindow('win_add_asset');
        if (win) {
            win.destroy();
        }
    } else {
        plugins.dialogs.showErrorDialog('Save Error', 'Could not save the record. Please check data.', 'OK');
    }

}

/**
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"035B98F3-A793-4858-8D4B-63B98B3320DA"}
 */
function onActionCancel(event) {
    databaseManager.revertEditedRecords(foundset);
    
    var win = application.getWindow('win_add_window');
    if (win) {
        win.destroy();
    }

}

/**
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A87BD76A-A6DC-40D6-986C-25B101526AA3"}
 */
function onHide(event) {
    databaseManager.revertEditedRecords(foundset);
    return true;

}
