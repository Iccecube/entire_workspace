
/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"FBCB5AA6-8C25-4DBD-9053-6E14E6E969C1"}
 * @override
 */
function newRecord(event) {
    if (!_super.newRecord(event)) return; // _super calls foundset.createRecord()

    var rec = foundset.getSelectedRecord();
    rec.first_name = '';
    rec.last_name = '';
    rec.email = '';
    rec.phone = '';
    rec.date_joined = application.getServerTimeStamp();
    rec.membership_type = 'regular';
    rec.rating = 1000;
    rec.active = 1;
    rec.notes = '';

    plugins.dialogs.showInfoDialog('New Member', 'Enter member information and click Save.');
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"34FD8D0E-0DF9-4299-9D7C-A8F6B3C03CEC"}
 * @override
 */
function saveRecord(event) {
    var rec = foundset.getSelectedRecord();
    application.output(rec);

    if (!rec) {
        plugins.dialogs.showWarningDialog('No Selection', 'No member selected.');
        return false;
    }
    

    // Required field validation
    if (!rec.first_name || rec.first_name.trim() == '') {
        plugins.dialogs.showWarningDialog('Required', 'First Name is required.');
        return false;
    }
    if (!rec.last_name || rec.last_name.trim() == '') {
        plugins.dialogs.showWarningDialog('Required', 'Last Name is required.');
        return false;
    }
    if (!rec.email || rec.email.trim() == '') {
        plugins.dialogs.showWarningDialog('Required', 'Email is required.');
        return false;
    }
    if (rec.email.indexOf('@') == -1) {
        plugins.dialogs.showWarningDialog('Invalid Email', 'Please enter a valid email address.');
        return false;
    }

    
    var fs = datasources.db.chess_club_db.chess_members.getFoundSet();
    fs.loadRecords("email = '" + rec.email + "' AND member_id != " + (rec.member_id || 0));
    if (fs.getSize() > 0) {
        plugins.dialogs.showWarningDialog('Duplicate Email', 'This email is already registered.');
        return false;
    }

   
    if (rec.rating < 0 || rec.rating > 3000) {
        plugins.dialogs.showWarningDialog('Invalid Rating', 'Rating must be between 0 and 3000.');
        return false;
    }

    
    return _super.saveRecord(event);
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"BDBDC981-EF27-4A21-8D7D-D8D339C3656F"}
 * @override
 */
function deleteRecord(event) {
    var rec = foundset.getSelectedRecord();
    const answer = scopes.dialog.deleteRecord(rec);
    var memberName = rec.first_name + ' ' + rec.last_name;

    if (answer) {
       foundset.deleteRecord();
       databaseManager.saveData();
       plugins.dialogs.showInfoDialog('Deleted', memberName + ' has been deleted.');
       
    }
}


/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"B8AEB349-A52F-4215-B7B9-FE3D9D8C4A62"}
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
    email = term;

    var count = foundset.search();

    if (count > 0) {
        plugins.dialogs.showInfoDialog('Results', 'Found ' + count + ' member(s).');
    } else {
        plugins.dialogs.showInfoDialog('No Results', 'No members found matching "' + searchText + '".');
    }
}


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"9BB53263-C82C-4C84-AFC9-3B4623603C57"}
 * @override
 */
function clearSearch(event) {
    searchText = '';
    _super.clearSearch(event);
}


/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"1C2A15D4-4B7E-4781-929B-EBDDF45042C0"}
 * @override
 */
function onShow(firstShow, event) {
    _super.onShow(firstShow, event);
    if (firstShow) {
        foundset.sort('last_name asc, first_name asc');
    }
}