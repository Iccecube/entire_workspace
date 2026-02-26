/**
 * Fired when the "Add Employee" button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"64150FAB-DE08-44C7-A43C-D2557B4CBF2D"}
 */
function onAction(event) {

    var targetFs = forms.addEmployee.foundset;
    
    databaseManager.revertEditedRecords(targetFs);
    
    var newRecordIndex = targetFs.newRecord();
    var rec = targetFs.getRecord(newRecordIndex);

    rec.is_active = 1;

    var win = application.createWindow('win_add_employee', JSWindow.MODAL_DIALOG);
    win.title = 'Add Employee';
    win.setSize(400, 300);
    win.resizable = false; 
    
    win.show(forms.addEmployee);
}

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D6C1E2F3-4B5A-6789-0ABC-DEF123456789"}
 */
var searchTerm = null;

/**
 * @param {Number} foundsetindex
 * @param {Number} columnindex
 * @param {JSRecord} record
 * @param {JSEvent} [event]
 * @param {String} [dataTarget]
 *
 * @properties={typeid:24,uuid:"D52C5DF3-AEA5-41BD-B05F-624CD7244E84"}
 */
function onCellClick(foundsetindex, columnindex, record, event, dataTarget) {
    if (!record) return;

    var gridElement = elements.datagrid_1; 
    var col = gridElement.getColumn(columnindex);

    if (col.id == 'delete_col') {
        var msg = "Are you sure you want to delete the employee '" + record.name + "'?";
        var answer = plugins.dialogs.showQuestionDialog('Confirm Delete', msg, 'Delete', 'Cancel');

        if (answer == 'Delete') {
            record.foundset.deleteRecord(record);
        }
        return;
    }

    if (col.id == 'possessions_col') {
        showEmployeePossessions(record);
    }
}

/**
 * * @param {JSRecord} employeeRecord
 *
 * @properties={typeid:24,uuid:"E7A1B2C3-D4E5-F6A7-B8C9-D0E1F2A3B4C5"}
 */
function showEmployeePossessions(employeeRecord) {
    var employeeName = employeeRecord.name;
    
    var q = datasources.db.assetflowdb.assignments.createSelect();
    
    q.result.add(q.joins.assignments_to_assets.columns.name, 'asset_name');
    q.result.add(q.columns.assignment_uuid.count, 'qty');
    
    q.where.add(q.columns.employee_id.eq(employeeRecord.employee_uuid)); 
    q.where.add(q.columns.returned_date.isNull);
    
    // Group By Asset Name
    q.groupBy.add(q.joins.assignments_to_assets.columns.name);
    
    var ds = databaseManager.getDataSetByQuery(q, -1);
    
    if (ds.getMaxRowIndex() === 0) {
        plugins.dialogs.showInfoDialog('Possessions', employeeName + ' currently holds no active assets.');
        return;
    }
    
    var possessionsList = [];
    for (var i = 1; i <= ds.getMaxRowIndex(); i++) {
        var assetName = ds.getValue(i, 1);
        var count = ds.getValue(i, 2);
        possessionsList.push(count + 'x ' + assetName);
    }
    
    var message = employeeName + ' currently holds: ' + possessionsList.join(', ') + '.';
    plugins.dialogs.showInfoDialog('Possessions', message);
}

/**
 * * @properties={typeid:24,uuid:"B624B3C4-C673-44CD-8B96-8239E91B3265"}
 */
function onSearch(oldValue, newValue, event) {
    if (!searchTerm) {
        foundset.loadAllRecords();
        return true;
    }

    var q = foundset.getQuery();
    q.where.clear(); 
    
    var orGroup = q.or;
    orGroup.add(q.columns.name.upper.like("%" + searchTerm.toUpperCase() + "%"));
    orGroup.add(q.columns.email.upper.like("%" + searchTerm.toUpperCase() + "%"));
    
    q.where.add(orGroup);
    
    foundset.loadRecords(q);
    
    if (foundset.getSize() == 0) {
        plugins.dialogs.showInfoDialog('Info', 'No employees found matching "' + searchTerm + '"');
        foundset.loadAllRecords(); 
    }
    
    return true;
}

/**
 * * @properties={typeid:24,uuid:"5AEFD343-CD87-4105-8684-9B4528F6FCBC"}
 */
function getChartData() {
    var query = "SELECT e.name, COUNT(a.assignment_id) " +
                "FROM employees e " +
                "LEFT JOIN assignments a ON e.employee_id = a.employee_id AND a.returned_date IS NULL " +
                "GROUP BY e.employee_id, e.name " +
                "ORDER BY e.name";
                
    var ds = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);
    
    var employeeNames = [];
    var assetCounts = [];

    for (var i = 1; i <= ds.getMaxRowIndex(); i++) {
        employeeNames.push(ds.getValue(i, 1) || "Unknown");
        assetCounts.push(ds.getValue(i, 2) || 0);
    }

    return {
        labels: employeeNames,
        datasets: [{
            label: "Actifs possédés",
            data: assetCounts,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    };
}

/**
 * @properties={typeid:24,uuid:"BFC6A4EF-2DF0-42D2-8927-DA6043A44223"}
 */
function refreshAssetChart() {
    var rawResult = getChartData();
    if (!elements.chart_assets) return;

    elements.chart_assets.setData(JSON.parse(JSON.stringify(rawResult)));
    
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    };
    elements.chart_assets.setOptions(JSON.parse(JSON.stringify(chartOptions)));
}

/**
 * @properties={typeid:24,uuid:"4C06DA70-1A5D-48F8-9B6F-97A367EBE10F"}
 */
function onShow(firstShow, event) {
	refreshAssetChart();
}