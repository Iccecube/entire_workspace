
/**
 * button clicked Event.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"82550650-6F24-4B8B-BE34-BF2CFA3C3EFC"}
 */
function onAction(event) {

    var addAssFs = forms.addassignments.foundset;
    
    databaseManager.revertEditedRecords(addAssFs);
    
    var newIndex = addAssFs.newRecord();
    var rec = addAssFs.getRecord(newIndex);
    

    rec.returned_date = null;

    var win = application.createWindow('win_add_assignments', JSWindow.MODAL_DIALOG);
    win.title = 'Assign Asset to Employee';
    win.setSize(500, 400); 
    win.resizable = false; 
    
    win.show(forms.addassignments);
}

/**
 * 
 * @param {Number} foundsetindex
 * @param {Number} columnindex
 * @param {JSRecord} record
 * @param {JSEvent} [event]
 * @param {String} [dataTarget]
 *
 * @properties={typeid:24,uuid:"6D7D27B3-3230-4965-8036-99E8789CC2A8"}
 */
function onCellClick(foundsetindex, columnindex, record, event, dataTarget) {
	
	if (!record) return;

    var gridElement = elements.datagrid_10; 
    var col = gridElement.getColumn(columnindex);

    if (col.id == 'delete_assignement') {
        var empName = record.assignments_to_employees ? record.assignments_to_employees.name : "Unknown Employee";
        var assetName = record.assignments_to_assets ? record.assignments_to_assets.name : "Unknown Asset";
        
        var msg = "Are you sure you want to delete this assignment: " + empName + " -> " + assetName + " ?";

        var answer = plugins.dialogs.showQuestionDialog(
            'Confirm Delete',   
            msg,                
            'Delete',           
            'Cancel'            
        );

        if (answer == 'Delete') {
            // Excellent : Ceci est la meilleure pratique pour supprimer un record précis
            record.foundset.deleteRecord(record);
        }
        return;
    }

}

/**
 * @properties={typeid:24,uuid:"9F56789C-2163-451C-B070-D4D3993D27CA"}
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 */
function loadAssignmentsByCategory(firstShow, event) {
	    
	    // We could also use the Servoy Query Builder 
		var query = "SELECT assets.category, COUNT(*) " +
	    "FROM assignments " +
	    "JOIN assets ON assignments.asset_id = assets.asset_uuid " +
	    "WHERE assignments.returned_date IS NULL " +
	    "GROUP BY assets.category " +
	    "ORDER BY COUNT(*) DESC";

	    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);

	    var labelsArray = [];
	    var dataArray = [];

	    for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
	        labelsArray.push("" + dataset.getValue(i, 1)); 
	        dataArray.push(1 * dataset.getValue(i, 2));   
	    }
	    
	    application.output("dataArray" + dataArray);

	    var myColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

	    var chartPackage = {
	        type: 'pie', 
	        data: {
	            labels: labelsArray,
	            datasets: [{
	                data: dataArray,
	                backgroundColor: myColors,
	                hoverOffset: 4
	            }]
	        }
	    };

	    if (elements.chart_assignments) {
	        
	        elements.chart_assignments.setData(chartPackage);

	        var options = {
	            responsive: true,
	            maintainAspectRatio: false,
	            plugins: {
	                legend: { position: 'right' },
	                title: { display: true, text: 'Active Assignments by Category' }
	            }
	        };

	        elements.chart_assignments.setOptions(options);
	    }
	}

/**
 *  when form is shown.
 *
 * @param {Boolean} firstShow 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"09F2C36E-3092-4BA9-9388-53C087CAB4F3"}
 */
function onShow(firstShow, event) {
	loadAssignmentsByCategory(firstShow, event);
   
}