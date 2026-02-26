/**
 * @param event
 * @param menuItem
 *
 * @properties={typeid:24,uuid:"9A2A1ADF-7B42-4706-9600-8C7D4F3FFF3B"}
 */
function onMenuItemClicked(event, menuItem) {

	switch (menuItem.itemId) {
	case 'dash':
		forms.sub_dashboard.controller.show();
		break;
	case 'members':
		forms.sub_chess_members.controller.show();
		break;
	case 'tour':
		forms.sub_tournaments.controller.show();
		break;
	default:
		application.output('unknown nav item  ' + menuItem.itemId);
		break;
	}

	// Highlight the clicked item as active in the navbar
	setActiveNavItem(menuItem.itemId);
}
/**
 * TODO generated, please specify type and doc for the params
 * @param itemId
 *
 * @properties={typeid:24,uuid:"1339F622-0134-41EC-871D-6A6199B77A1D"}
 */
function setActiveNavItem(itemId) {
	elements.navbar.setMenuSelected(itemId);
}

