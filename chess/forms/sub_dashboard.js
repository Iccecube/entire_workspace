
/**
 * @properties={typeid:35,uuid:"AB5D5DA1-978D-4D17-8D66-7E0206422613",variableType:-4}
 */
var totalMembers = null;


/**
 * @properties={typeid:35,uuid:"63CC4442-4A30-403D-84D7-6884671D9B2D",variableType:-4}
 */
var activeMembers = null;


/**
 * @properties={typeid:35,uuid:"5C589E3D-3074-4D96-92C9-238E0F08662A",variableType:-4}
 */
var averageRating = null;





/**
 * TODO generated, please specify type and doc for the params
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"1D3F4D5F-5A23-4669-B75A-BF9CB769EBC6"}
 */
function onShow(firstShow, event) {
    calculateStatistics();
    loadRecentActivity();
}


/**
 * @properties={typeid:24,uuid:"DE7C162C-0878-4E66-8DDF-19572753B274"}
 */
function calculateStatistics() {
    
    // Total members
    var membersFs = datasources.db.chess_club_db.chess_members.getFoundSet();
    membersFs.loadAllRecords();
    totalMembers = membersFs.getSize();
    
    // Active members
    var activeQuery = datasources.db.chess_club_db.chess_members.createSelect();
    activeQuery.where.add(activeQuery.columns.active.eq(1));
    var activeFs = datasources.db.chess_club_db.chess_members.getFoundSet();
    activeFs.loadRecords(activeQuery);
    activeMembers = activeFs.getSize();
    
    // Average rating 
    var avgDs = databaseManager.getDataSetByQuery(
        'chess_club_db',
        'SELECT ROUND(AVG(rating::numeric), 0) FROM chess_members WHERE rating > 0',
        null,
        1
    );
    averageRating = (avgDs && avgDs.getMaxRowIndex() > 0 && avgDs.getValue(1, 1) != null)
        ? Math.round(avgDs.getValue(1, 1))
        : 0;
    
  
}


/**
 * @properties={typeid:24,uuid:"4A6E0F27-B0F3-4E3E-A7A4-CDFE892607B5"}
 */
function loadRecentActivity() {

}


