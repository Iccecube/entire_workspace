/**
 * @properties={type:8,typeid:36,uuid:"8B3E2A57-3963-443F-A1ED-5FF38A9CFA4D"}
 */
 function registration_count()
 {
     return tournaments_to_registrations.getSize();
 }


/**
 * @properties={type:12,typeid:36,uuid:"394DEEB2-3AAF-4BF0-B21F-8E13BB3478CE"}
 */
function month_label() {
	    if (start_date) {
	        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	        return months[start_date.getMonth()] + ' ' + start_date.getFullYear();
	    }
	    return '';
	}

/**
 * @properties={type:8,typeid:36,uuid:"B027DE96-A537-4DED-9F63-BBFA82148823"}
 */
function tournament_count() {
	       return 1; // Count each tournament
	   }
