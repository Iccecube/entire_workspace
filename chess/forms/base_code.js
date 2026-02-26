
/**
 * TODO generated, please specify type and doc for the params
 * @param event
 * @param menuItem
 *
 * @properties={typeid:24,uuid:"AB0A3563-F64B-40F5-8DF1-E7289EE1A348"}
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
 * @properties={typeid:24,uuid:"EDFACDA6-FD8C-4AC0-A208-5CE8417AD6BF"}
 */
function setActiveNavItem(itemId) {
    elements.navbar.setMenuSelected(itemId);
}

