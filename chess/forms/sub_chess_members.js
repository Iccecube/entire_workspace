/**
 * @param event
 * @override
 *
 * @properties={typeid:24,uuid:"1E4A18FC-6FB8-48D3-8ECF-B74D2E7854AF"}
 * @AllowToRunInFind
 */
function searchRecords(event) {
	if (!searchText || searchText.trim() == '') {
        plugins.dialogs.showWarningDialog('Search', 'Please enter search text.');
        return;
    }

    var term = '%' + searchText.trim() + '%';

    foundset.find();
	first_name = term;
	foundset.newRecord(); 
	last_name = term;
	foundset.newRecord();
	email= term;
	var count = foundset.search();
	if (count > 0) {
        plugins.dialogs.showInfoDialog('Results', 'Found ' + count + ' record(s).');
    } else {
        plugins.dialogs.showInfoDialog('No Results', 'No records found matching "' + searchText + '".');
        foundset.loadAllRecords();
    }
	
}
