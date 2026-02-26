/**
 * Fired when the Cancel Button is clicked.
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"D9DAE23E-24F7-45B3-ABE8-A5DBF8FFA452"}
 */
function onCancel(event) {
    databaseManager.revertEditedRecords(foundset);

    var win = application.getWindow('win_add_assignments');
    if (win) {
        win.destroy();
    }
}
/**
 * @type {JSRecord<db:/assetflowdb/assets>} 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F69678CA-54DD-4F04-88AA-E09643758C68"}
 */
function onAction(event) {
	var rec = foundset.getSelectedRecord();
    if (!rec) return;

    // Some ValidationsForm Staff
    if (!rec.asset_id) {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please select an Asset.', 'OK');
        return;
    }
    if (!rec.employee_id) {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please select an Employee.', 'OK');
        return;
    }
    if (!rec.assigned_date) {
        plugins.dialogs.showErrorDialog('Validation Error', 'Please enter the Assigned Date.', 'OK');
        return;
    }

    if (rec.returned_date != null && rec.returned_date < rec.assigned_date) {
        plugins.dialogs.showErrorDialog('Date Error', 'The Returned Date cannot be before the Assigned Date.', 'OK');
        return;
    }
    var success = databaseManager.saveData(rec);
    
    if (success) {
        var relatedAsset = rec.assignments_to_assets; 
        
        if (relatedAsset) {
            if (rec.returned_date == null) {
                relatedAsset.status = 'ASSIGNED'; 
            } else {
                relatedAsset.status = 'IN_STOCK'; 
            }
           
            databaseManager.saveData(relatedAsset);
        }

        // closing window
        var win = application.getWindow('win_add_assignments');
        if (win) {
            win.destroy();
        }
    } else {
        plugins.dialogs.showErrorDialog('Save Error', 'Could not save the assignment record.', 'OK');
    }
}
/**
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"49AD8B5E-7724-466C-8F4C-4B1242D8EFCC"}
 */
function onHide(event) {
	databaseManager.revertEditedRecords(foundset);
	return true;
}
