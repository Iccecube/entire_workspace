/**
 * @properties={type:12,typeid:36,uuid:"0EA222EE-292C-4F92-AC53-E7B4525C216D"}
 */
 function result_display() {
	    if (result == 'white_win') return 'White Wins';
	    if (result == 'black_win') return 'Black Wins';
	    if (result == 'draw') return 'Draws';
	    return result;
	}

/**
 * @properties={type:8,typeid:36,uuid:"F421E722-B677-4013-A1AF-D0E8D4B8D455"}
 */
function game_count()
{
	return 1;
}
