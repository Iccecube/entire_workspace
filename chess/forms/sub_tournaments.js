/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B58C12A1-639B-4016-B990-A709C9B64EBE"}
 */
var searchText = null;


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
    rec.start_date = application.getServerTimeStamp();
    rec.status = 'upcoming';
    rec.prize_fund = 0;
    rec.max_participants = 32;

    plugins.dialogs.showInfoDialog('New Tournament', 'Enter details and click Save.');
}

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C269A5CB-EDC3-47D3-BDF1-F5D06CD1C13C"}
 */


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
    var tName = rec.tournament_name;
    const answer = scopes.dialog.deleteRecord(rec);
    if (answer) {
       foundset.deleteRecord();
       databaseManager.saveData();
       plugins.dialogs.showInfoDialog('Deleted', tName + ' has been deleted.');
       
    }
}


/**
 * @	AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"2372B25A-0F67-4E2B-9794-03BD5D9286FE"}
 * @AllowToRunInFind
 */
function searchRecords(event) {
	var term = '%' + searchText.trim() + '%';
	application.output('Searching for: ' + term);
	_super.searchableColumns = ['tournament_name', 'status', 'location'];
	application.output('Searchable columns: ' + searchableColumns.join(', '));
    _super.search(term, searchableColumns) ;
 	
    
    
    
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

