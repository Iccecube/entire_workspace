/**
 * @properties={type:8,typeid:36,uuid:"447E3415-CC4E-44F9-AC80-D56FC36F179C"}
 */
 function getMembershipDoughnutData() {

	    var sql =
	        "SELECT membership_type AS label, COUNT(*) AS total " +
	        "FROM chess_members " +
	        "GROUP BY membership_type " +
	        "ORDER BY membership_type";

	    var ds = databaseManager.getDataSetByQuery(
	        "chess_club_db",
	        sql,
	        null,
	        -1
	    );

	    return ds;
	}


/**
 * @properties={type:8,typeid:36,uuid:"1CF750E8-46BB-48F0-A8FD-EA37CCF973B4"}
 */
function rank()
 {

 return foundset.getSelectedIndex();

 }

/**
 * @properties={type:12,typeid:36,uuid:"29A68094-F427-4257-AF06-700103D034D2"}
 */
function status_label() {
     return active == 1 ? 'Active' : 'Inactive';
 }

/**
 * @properties={type:8,typeid:36,uuid:"C5BF78B8-184C-4FD5-957D-D18808644798"}
 */
function rating_for_chart() {
	    return rating > 0 ? rating : 0;
	}

/**
 * @properties={type:8,typeid:36,uuid:"E8BB3C8F-8502-4AF4-8821-F8A05E289814"}
 */
function member_count()
{
	return 1;
}
