function putsnakes()
{
	snake1.draw(window);
	snake1.moveitbaby();
	drawcell(food.coord.x, food.coord.y, food.colorfg, food.colorbg);
	snake1.draw();
}

function init_vars()
{
	music = document.getElementById('music');
	c = document.getElementById('mycanvas');
	pause_overlay = document.getElementById('overlay');
	cw=30;
	scw=18;
//	c.width = 1300;
//	c.height = 600;
	ctx = c.getContext("2d");

	totalx = Math.floor(window.innerWidth/cw) - 1;
  	totaly = Math.floor(window.innerHeight/cw) - 1;

  	c.width = totalx*cw;
  	c.height = totaly*cw;

	c.style.left = (window.innerWidth-c.width)/2;
	c.style.top = (window.innerHeight-c.height)/2;

//	pause_overlay.style.top = 0;
//	pause_overlay.style.left = 0;

  	console.log(c.width, c.height);

	colorfg = "#FFFF99";
	colorbg = "#FFFFCC";
	speedfactor = 100;
	food = 
	{
		coord: [],
		colorfg: "#0000FF",
		colorbg: "#9999FF",
	}
//	console.log(c);
//	ctx.transform(100, 100); //Sets 100, 100 as the new origin
	main()
}

function main()
{
	for (var i = 0; i < totalx; i++)
		for (var j = 0; j < totaly; j++)
			drawcell(i, j, colorfg, colorbg);
	
	snake1 = new snake_object("#00FF00", "#99FF99");
	control = snake1;
	snake1.create_proto(3);
	food.coord = gen_random_xy();
	drawcell(food.coord.x, food.coord.y, food.colorfg, food.colorbg);
//	console.log(snake1);d
	music.play();
	recurse = setInterval(putsnakes, speedfactor);
}

var ended = false;
function end_game(self)
{
	if(ended == true)
		return;
	ended = true;
	var dataString = "?name=";
	dataString += player1 + "&score=" + control.score;
	var xhr =new XMLHttpRequest();
	console.log("scripts/submit_score.php"+dataString);
	xhr.open("GET",("scripts/submit_score.php"+dataString), true);
	xhr.send();
	
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var p8='<form id="forms" name="input" action="your.php" method="get" style="visibility:hidden">';
			var p9='<input id="type_id" name="type" value="0" />';
			p9 += '<input type="text" name="winner" value="' + player1 + '" />';
			p9 += '<input type="text" name="score1" value="' + control.score + '" />';
			p9 += '<input type="text" name="loser" value="0" />';
			p9 += '<input type="text" name="score2" value="0" />'; 
			var p11='<br /></form>';
			var body = document.getElementsByTagName('body')[0];
			body.innerHTML = p8+p9+p11;
			document.getElementById('forms').submit();
		}
	}
}

function pause_game()
{
	clearInterval(recurse);
	window.removeEventListener('keyup', move1);
	pause_game_ui();
	window.addEventListener('keyup', resume_game);
}

function resume_game(e)
{
	if(e.which==27 || e.which==80)		//Esc OR p
	{
		recurse = setInterval(putsnakes, speedfactor);
		window.removeEventListener('keyup', resume_game);
		resume_game_ui();
		window.addEventListener('keyup', move1);
	}
}
