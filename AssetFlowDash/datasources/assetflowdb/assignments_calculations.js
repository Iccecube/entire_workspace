/**
 * @properties={type:8,typeid:36,uuid:"D49D6E47-7DA6-4F5C-9ED7-83AF137F78FF"}
 */
 function TotalAssignmentsByCategory() {
	    var myAssets = this.assignments_to_assets;
	    
	    // Sécurité : Si pas d'enregistrements, on retourne 0
	    if (!databaseManager.hasRecords(myAssets)) {
	        return 0;
	    }
	    
	    // On crée une liste vide pour mémoriser les catégories déjà comptées
	    var uniqueCategories = []; 
	    
	    for (var i = 1; i <= myAssets.getSize(); i++) {
	        var record = myAssets.getRecord(i);
	        
	        // On récupère la catégorie (assurez-vous que le champ s'appelle bien 'category' dans la table Assets)
	        var currentCategory = record.category; 
	        
	        if (currentCategory && uniqueCategories.indexOf(currentCategory) === -1) {
	            
	            uniqueCategories.push(currentCategory);
	        }
	    }
	    
	    // On retourne la taille de la liste (le nombre de catégories uniques trouvées)
	    return uniqueCategories.length;
	}
/**
 * @properties={type:12,typeid:36,uuid:"B52C1620-6CE0-4D6F-A23B-88F8CD58336A"}
 */
function c_filter_stock()
{
	return "🟢 In Stock";

}
