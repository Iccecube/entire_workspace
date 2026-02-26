
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2DAB08EA-3C45-45AC-908D-445A5F536965"}
 */
function onAction(event) {
	
	var rec = foundset.getSelectedRecord();

    if (!rec.name || rec.name.trim() === '') {
        plugins.dialogs.showErrorDialog('Validation Error', 'Asset Name is required.', 'OK');
        return;
    }

    // TYPES : Hardware vs Software
    if (!rec.type || rec.type.trim() === '') {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please select a Type (Hardware or Software).', 'OK');
        return;
    }

    // Must be at least 1
    if (rec.total_seats == null || rec.total_seats < 1) {
        plugins.dialogs.showErrorDialog('Validation Error', 'Total Seats must be at least 1.', 'OK');
        return;
    }

    // Save Record
    var success = databaseManager.saveData(rec);
    
    if (success) {
        var win = application.getWindow('win_add_asset');
        if (win) {
            win.destroy();
        }
    } else {
        plugins.dialogs.showErrorDialog('Save Error', 'Could not save the asset. Please check data.', 'OK');
    }

}

/**
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"16298FA5-6C7D-49C5-B66F-D0FBA2943D36"}
 */
function onActionCancel(event) {
    databaseManager.revertEditedRecords(foundset);
    
    var win = application.getWindow('win_add_asset');
    if (win) {
        win.destroy();
    }

}

/**
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DFF2A32A-B60D-4DE3-BCA1-1752D590A42F"}
 */
function onHide(event) {
    databaseManager.revertEditedRecords(foundset);
    return true;

}
