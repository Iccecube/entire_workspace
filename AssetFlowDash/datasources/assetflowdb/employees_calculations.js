/**
 * @properties={type:8,typeid:36,uuid:"B196D653-3F28-44C5-B5E4-BC5BBF069B58"}
 */
function TotalAssignments()
{
    var myAssignments = this.employees_to_assignments;
	
	// Si pas d'assignations, on retourne 0
	if (!databaseManager.hasRecords(myAssignments)) {
		return 0;
	}
	
	var activeCount = 0;
	
	// On boucle uniquement sur LES assignations de CET employé
	for (var i = 1; i <= myAssignments.getSize(); i++) {
		var record = myAssignments.getRecord(i);
		
		// Si la date de retour est vide, c'est un actif possédé
		if (record.returned_date == null) {
			activeCount++;
		}
	}
	
	return activeCount;
}
