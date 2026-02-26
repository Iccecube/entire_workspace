/**
 * @properties={type:12,typeid:36,uuid:"FA085266-B436-48A1-92D0-9B0FA5A17B8E"}
 */
function HardInRepairCount(){
	    var query = "SELECT COUNT(*) FROM assets WHERE type = 'Hardware' AND status = '🟠 In Repair '";
	    
	    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);
	    var countValue = dataset.getValue(1, 1);

	    if (countValue == null) {
	        countValue = 0;
	    }
	    
	   
	    // application.output("Hardware In Repair Count: " + countValue);

	    return utils.numberFormat(countValue, '#');
	}

/**
 * @properties={type:12,typeid:36,uuid:"386E753B-C56A-4CA3-AAF4-EDE928C6B392"}
 */
function TotalAssetsStock(){
    var query = "SELECT SUM(cost) FROM assets WHERE status = '🟢 In Stock'";
    
    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);
    var stockValue = dataset.getValue(1, 1);
    
    if (!stockValue) {
        stockValue = 0;
    }

    return utils.numberFormat(stockValue, '$#,##0.00');
}

/**
 * @properties={type:12,typeid:36,uuid:"E08E6F38-BD3E-4C05-82E2-914FCA31E2E9"}
 */
function TotalAssetsValue(){
    var query = "SELECT SUM(cost) FROM assets";
    
    var dataset = databaseManager.getDataSetByQuery("assetflowdb", query, null, -1);
    var totalValue = dataset.getValue(1, 1);
    
    if (totalValue == null) {
        totalValue = 0;
    }

    return utils.numberFormat(totalValue, '$#,##0.00');
}
