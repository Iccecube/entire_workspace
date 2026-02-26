
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"46B622CC-5EE0-4FDD-8A6E-C6CD10CC9A7C"}
 */
function onAction(event) {
    databaseManager.revertEditedRecords(forms.addAssets.foundset);
	

    forms.addAssets.foundset.newRecord();

    // Default Status: "In Stock" 
    forms.addAssets.foundset.status = '🟢 In Stock';


    // Date: Today
    forms.addAssets.foundset.purchase_date = new Date();

    var win = application.createWindow('win_add_asset', JSWindow.MODAL_DIALOG);
    
    win.title = 'Add Asset';
    
    win.setSize(600, 400); 
    win.resizable = false; 
    
    win.show(forms.addAssets);
    
    

}

/**
 *
 * @param {Number} foundsetindex
 * @param {Number} columnindex
 * @param {JSRecord} record
 * @param {JSEvent} [event]
 * @param {String} [dataTarget]
 *
 * @properties={typeid:24,uuid:"C1D2E3F4-A5B6-7890-CDEF-123456789012"}
 */
function onCellClick(foundsetindex, columnindex, record, event, dataTarget) {
    if (!record) return;
    
    var gridElement = elements.datagrid_3;
    
    var col = gridElement.getColumn(columnindex);

    if (col.id != 'assetDetail_col') {
        return; 
    }
    
    forms.assetDetails.foundset.loadRecords(record.asset_uuid);
    
    var win = application.createWindow('win_asset_details', JSWindow.MODAL_DIALOG);
    win.title = 'Asset Details';
    win.setSize(400, 250);
    win.resizable = false;
    
    win.show(forms.assetDetails);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0978D04E-5645-4B5D-A91E-22608C697C72"}
 */
function loadStatusChart(firstShow, event) {

    var query = "SELECT status, COUNT(*) FROM assets GROUP BY status ORDER BY status";
    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);
    
    var labelsArray = [];
    var dataArray = [];
    
    for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
        labelsArray.push("" + dataset.getValue(i, 1)); 
        dataArray.push(1 * dataset.getValue(i, 2));   
    }
    
    var myColors = ['#2ecc71', '#3498db', '#e67e22', '#95a5a6'];
    var chartPackage = {
        type: 'doughnut',
        data: {
            labels: labelsArray,
            datasets: [{
                data: dataArray,
                backgroundColor: myColors,
                hoverOffset: 4
            }]
        }
    };

    if (elements.chart_status) {
                        
            elements.chart_status.setData(chartPackage);
            var options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
		            title: { display: true, text: 'Total Assets by Status' }
                }
            };  
            elements.chart_status.setOptions(options);
        }
}
/**
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1AFA4BC9-B2FE-4943-AA9D-C0F1A2187E3F"}
 */
function loadCostChart(firstShow, event) {
    var query = "SELECT type, SUM(cost) FROM assets GROUP BY type ORDER BY type";
    
    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);
    
    var labelsArray = [];
    var dataArray = [];
    
    for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
        labelsArray.push("" + dataset.getValue(i, 1)); 
        dataArray.push(1 * dataset.getValue(i, 2));   
    }

    var barColors = ['#3498db', '#e74c3c', '#9b59b6', '#f1c40f', '#2ecc71'];
    var chartPackage = {
        type: 'bar', 
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'Total Cost ($)',
                data: dataArray,
                backgroundColor: barColors,
                borderWidth: 1
            }]
        }
    };

    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }, 
            title: { display: true, text: 'Total Cost by Asset Type' }
        },
        scales: {
            y: {
                beginAtZero: true 
            }
        }
    };
   
    if (elements.chart_cost) {
            elements.chart_cost.setData(chartPackage);
            elements.chart_cost.setOptions(chartOptions);
        }
}

/**
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"88178838-CC15-4DFE-9F50-F0FA1799EF3A"}
 */
function onShow(firstShow, event) {
	
    loadStatusChart(firstShow, event);
    loadCostChart();
}
