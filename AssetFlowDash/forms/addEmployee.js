/**
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6F888F4C-EC1C-4581-BF63-04E30C31F366"}
 */
function onAction(event) {
	
	var rec = foundset.getSelectedRecord();

	if (!rec.name || rec.name.trim() === '') {
		plugins.dialogs.showErrorDialog('Validation Error', 'Please enter the employee name.', 'OK');
		return;
	}
	
	if (!rec.email || rec.email.trim() === '') {
		plugins.dialogs.showErrorDialog('Validation Error', 'Please enter the employee email.', 'OK');
		return;
	}
	
	var success = databaseManager.saveData(rec);
	
	if (success) {
		var win = application.getWindow('win_add_employee');
		if (win) {
            win.destroy();
        }
    } else {
        plugins.dialogs.showErrorDialog('Save Error', 'Could not save the employee record.', 'OK');
    }
}

/**
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A1B2C3D4-E5F6-7890-ABCD-EF1234567890"}
 */
function onCancel(event) {
	databaseManager.revertEditedRecords();

	var win = application.getWindow('win_add_employee');
    if (win) {
        win.destroy();
    }
}

/**
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"36C32490-B935-47C3-AC9B-F5C094F182C1"}
 */
function onHide(event) {
	databaseManager.revertEditedRecords(foundset);
    return true;

}
