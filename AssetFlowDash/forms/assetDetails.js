
/**
 * Handle form's hide.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"89CF8CB5-5037-457E-A6EC-070DEA2DD38C"}
 */
function onHide(event) {
	databaseManager.revertEditedRecords(foundset);
	
	// Refresh the assets form foundset to fix grid display
	forms.assets.foundset.loadAllRecords();
	
	return true;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"17896A85-249A-4076-9619-D553F2C6D005"}
 */
function onCancel(event) {
	databaseManager.revertEditedRecords();

	application.getWindow('win_asset_details').destroy();
	
	// Refresh the assets form foundset to fix grid display
	forms.assets.foundset.loadAllRecords();
}
