/**
 * @properties={typeid:35,uuid:"21B08CC7-AC74-402E-A637-10350D87E0E5",variableType:-4}
 */
var searchableColumns = [];

/**
 * @properties={typeid:24,uuid:"2336FED2-642A-4193-BE76-C362B5A89256"}
 * @AllowToRunInFind
 */
function search(term, searchableColumns) {
	
	if (!term || term.trim() == '') {
        plugins.dialogs.showWarningDialog('Search', 'Please enter search text.');
        return;
    }
	foundset.find();
	searchableColumns.forEach(col => {
		foundset[col] = term;
		foundset.newRecord();
		
	}
	
		
	)
	var count = foundset.search();
	if (count > 0) {
        plugins.dialogs.showInfoDialog('Results', 'Found ' + count + ' record(s).');
    } else {
        plugins.dialogs.showInfoDialog('No Results', 'No records found matching "' + searchText + '".');
        foundset.loadAllRecords();

    }
	
	
	
}

