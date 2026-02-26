/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1D944F3D-D07A-415C-8818-1E8A59C45BAD"}
 */
function onLoad(event) {	
	var menuItems = [
		{ id: 'home', text: 'Home' },
		{ id: 'assignments', text: 'Assignments' },
		{ id: 'employees', text: 'Employees' },
		{ id: 'assets', text: 'Assets' }
	];

	elements.sidenav_18.setRootMenuItems(menuItems);
	
	if (forms.home) {
		elements.sidenav_18.containedForm = forms.home;
	}
}

/**
 * Called when a menu item is selected.
 *
 * @param {String} menuItemId
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6DAC60B6-5847-49F8-8AF1-CD16B89BD913"}
 */
function onMenuItemSelected(menuItemId, event) {
    application.output('Menu item selected: ' + menuItemId);
    
    if (menuItemId == 'home' && forms.home) {
        elements.sidenav_18.containedForm = forms.home;
    } else if (menuItemId == 'employees' && forms.employees) {
        elements.sidenav_18.containedForm = forms.employees;
    }else if (menuItemId == 'assets' && forms.assets) {
        elements.sidenav_18.containedForm = forms.assets;
    }else if (menuItemId == 'assignments' && forms.assignments) {
        elements.sidenav_18.containedForm = forms.assignments;
    }
}