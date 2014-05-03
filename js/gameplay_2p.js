function fixintercollision()
{
	var when = 1;
	if(snake1.positions[0].x == snake2.positions[0].x && snake1.positions[0].y == snake2.positions[0].y)
	{
		if(snake1.positions.length > 1)
		{
			if(snake2.positions.length == 1)
				end_game(snake2, "it was too small to face the other snake");
			else
			{
				snake1.poptill(snake1.positions[1].x, snake1.positions[1].y);
				when = 0;
			}
		}
		if(snake2.positions.length > 1)
		{
			if(snake1.positions.length == 1 && when)
				end_game(snake1, "it was too small to face the other snake");
			else
				snake2.poptill(snake2.positions[1].x, snake2.positions[1].y);
		}
	}
	else
	{
		if(snake1.collided(snake2.positions[0].x, snake2.positions[0].y))
			snake1.poptill(snake2.positions[0].x, snake2.positions[0].y);
		if(snake2.collided(snake1.positions[0].x, snake1.positions[0].y))
			snake2.poptill(snake1.positions[0].x, snake1.positions[0].y);
	}
}

function putsnakes()
{
	snake1.draw(window);
	snake2.draw(window);
	snake1.moveitbaby();
	fixintercollision();
	snake2.moveitbaby();
	fixintercollision();
	drawcell(food.coord.x, food.coord.y, food.colorfg, food.colorbg);
	snake1.draw();
	snake2.draw();
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
	snake2 = new snake_object("#FF0000", "#FF9999");
	control = snake1;
	snake1.create_proto(1);
	snake2.create_proto(3);
	food.coord = gen_random_xy();
	drawcell(food.coord.x, food.coord.y, food.colorfg, food.colorbg);
	music.play();
//	console.log(snake1);
	recurse = setInterval(putsnakes, speedfactor);
}

function end_game(loser, reason)
{
	if(loser==snake1)
	{
		winner = snake2;
		los = player1;
		win = player2
	}
	else
	{
		winner = snake1;
		los = player2;
		win = player1;
	}
	var p8='<form id="forms" name="input" action="your.php" method="get" style="visibility:hidden">';
	var p9='<input id="type_id" name="type" value="1" />';
	p9 += '<input type="text" name="winner" value="' + win + '" />';
	p9 += '<input type="text" name="score1" value="' + winner.score + '" />';
	p9 += '<input type="text" name="loser" value="' + los + '" />';
	p9 += '<input type="text" name="score2" value="' + loser.score + '" />'; 
	var p11='<br /></form>';
	var body = document.getElementsByTagName('body')[0];
	body.innerHTML = p8+p9+p11;
	document.getElementById('forms').submit();
}

function pause_game()
{
	clearInterval(recurse);
	window.removeEventListener('keyup', move1);
	window.removeEventListener('keyup', move2);
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
		window.addEventListener('keyup', move2);
	}
}