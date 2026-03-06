/**
 * @param event
 *
 * @properties={typeid:24,uuid:"1E4A18FC-6FB8-48D3-8ECF-B74D2E7854AF"}
 * @AllowToRunInFind
 * 
 */
function searchRecords(event) {
     
    var term = '%' + searchText.trim() + '%';
    _super.searchableColumns = ['first_name', 'last_name', 'email'];
    _super.search(term, searchableColumns) ;
 	
}
