/**
 * TODO generated, please specify type and doc for the params
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"37777DFB-A690-4544-8A79-32C6765EBD01"}
 */
function deleteRecord(rec){
	if (!rec) {
        plugins.dialogs.showWarningDialog('No Selection', 'Please select a row to delete.');
        return;
    }

    var response = plugins.dialogs.showQuestionDialog(
        'Delete row',
        'Do you confirm deletion. this action cannot be undone.',
        'Yes, Delete',
        'No, Cancel'
    );

    if (response == 'Yes, Delete') {
        return true;
    } else {
        return false
    }
    
}
