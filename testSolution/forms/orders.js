/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0C15B9A0-408B-4F67-836D-ADC123F8C455"}
 */
var searchText = null;


/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F2057EA4-555E-45B7-B032-1EB7BDC271F7"}
 */
 function newOrder(event) {
		foundset.newRecord();
	}

	/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DFD84B07-5387-4AD5-8B54-0639E39A6864"}
 */
function onDataChangeCustomer(oldValue, newValue, event) {
		
		// Lookup ship info from customer address
		shipaddress = orders_to_customers.address;
		shipcity = orders_to_customers.city;
		shipregion = orders_to_customers.region;
		shippostalcode = orders_to_customers.postalcode;
		shipcountry = orders_to_customers.country;
		
		return true;
	}
	/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"945976B4-FEFD-400B-A1F7-A2B27CC0E7A9"}
 */
	function addItem(event) {
		
		// create the record 
		orders_to_order_details.newRecord();
		
		// set the quantity default to 1
		orders_to_order_details.quantity = 1;
	}
	
	/**
 * Called when the columns data is changed.
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param [oldvalue]
 * @param [newvalue]
 * @param {JSEvent} [event]
 * @param {JSRecord} [record]
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2E955E47-B386-4AAA-A1E5-4E9CF9A42856"}
 */
	function onColumnDataChange(foundsetindex, columnindex, oldvalue, newvalue, event, record) {
		
		// Check if the first column (Product) was changed
		if(columnindex == 0){
			orders_to_order_details.unitprice = 
				orders_to_order_details.order_details_to_products.unitprice;
		}
		return true;
	}j
	
	/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6F379BC4-6490-4573-B510-95044AFAEC9D"}
 */
	function onSearch(event) {
		var search = scopes.svySearch.createSimpleSearch(foundset);
		search.setSearchAllColumns();
		search.setSearchText(searchText);
		search.addSearchProvider('orders_to_customers.companyname');
		search.addSearchProvider('orders_to_order_details.order_details_to_products.productname');
		search.loadRecords(foundset);
	}