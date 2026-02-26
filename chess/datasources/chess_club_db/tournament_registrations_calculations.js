/**
 * @properties={type:12,typeid:36,uuid:"A52DD6B4-8538-4164-B11C-3C7E3ED925EF"}
 */
 function wld_record() {
	    return wins + '-' + losses + '-' + draws;
	}

/**
 * @properties={type:12,typeid:36,uuid:"14B2FBAA-ED3B-474E-8D53-78A12536E1CB"}
 */
function player_full_name() {
	    if (registrations_to_members) {
	        return registrations_to_members.first_name + ' ' + registrations_to_members.last_name;
	    }
	    return '';
	}
