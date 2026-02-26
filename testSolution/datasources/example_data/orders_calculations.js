/**
 * @properties={type:8,typeid:36,uuid:"F1FC380D-486C-4557-90BE-5C08D428E874"}
 */
 function order_total()
 {
 	var sum = 0;
 	for (var i = 1; i <= orders_to_order_details.getSize(); i++) {
 		var record = orders_to_order_details.getRecord(i);
 		sum += record.subtotal;
 	}
 	return sum;
 }