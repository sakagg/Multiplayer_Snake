function gen_random_xy()
{
	var rx = Math.floor(Math.random()*totalx);
	var ry = Math.floor(Math.random()*totaly);
	return {x:rx, y:ry};
}

function drawcell(x, y, colorcenter, colorline)
{
	ctx.fillStyle = colorline;
	ctx.fillRect(x*cw, y*cw, cw, cw);
	ctx.fillStyle = colorcenter;
	ctx.fillRect(x*cw + (cw-scw)/2, y*cw + (cw-scw)/2, scw, scw);
}

function pause_all_music()
{
//	document.getElementById('gameover_music').pause();
//	document.getElementById('food_music').pause();
//	document.getElementById('bite_music').pause();
}

function pause_game_ui()
{
	pause_overlay.style.visibility = "visible";
	pause_all_music();
	music.pause();
	document.getElementById('gameover_music').play();
}

function resume_game_ui()
{
	pause_overlay.style.visibility = "hidden";
	pause_all_music();
	document.getElementById('gameover_music').play();
	music.play();
}