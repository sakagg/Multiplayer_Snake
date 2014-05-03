function fixintercollision()
{
	if(snake1.positions[0].x == snake2.positions[0].x && snake1.positions[0].y == snake2.positions[0].y)
	{
		if(snake1.positions.length > 1)
		{
			if(snake2.positions.length == 1)
				end_game(snake2, "it was too small to face the other snake")
			else
				snake1.poptill(snake1.positions[1].x, snake1.positions[1].y);
		}
		if(snake2.positions.length > 1)
		{
			if(snake1.positions.length == 1)
				end_game(snake1, "it was too small to face the other snake")
			else
				snake2.poptill(snake2.positions[1].x, snake2.positions[1].y);
		}
	}
	else
	{
		if(snake1.collided(snake2.positions[0].x, snake2.positions[0].y))
		{
			console.log("Collision Detected");
			snake1.poptill(snake2.positions[0].x, snake2.positions[0].y);

		}
		if(snake2.collided(snake1.positions[0].x, snake1.positions[0].y))
		{
			console.log("Collision Detected");
			snake2.poptill(snake1.positions[0].x, snake1.positions[0].y);
		}
	}
}

function putsnakes()
{
//	fixintercollision();
	control.calculatenext();
	drawcell(food.coord.x, food.coord.y, food.colorfg, food.colorbg);
//	console.log(other.positions.length);
}

function init_vars()
{
	music = document.getElementById('music');
	pause_overlay = document.getElementById('overlay');
	pause_message = document.getElementById('pause_message');
	c = document.getElementById('mycanvas');
//	c.width = 1300;
//	c.height = 600;
	ctx = c.getContext("2d");
	totalx = 30;
  	totaly = 20;

	var htmp = Math.floor(window.innerHeight/(5*totaly));
	var wtmp = Math.floor(window.innerWidth/(5*totalx));
	var min;

	if(wtmp < htmp)
		min = wtmp;
	else
		min = htmp;

	cw = 5*min;
	scw = 3*min;

  	c.width = totalx*cw;
  	c.height = totaly*cw;	

	c.style.left = (window.innerWidth-c.width)/2;
	c.style.top = (window.innerHeight-c.height)/2;

  	console.log(window.innerWidth, window.innerHeight, c.width, c.height);

// 	console.log(c.width, c.height);

	colorfg = "#FFFF99";
	colorbg = "#FFFFCC";
	speedfactor = 100;
	food = 
	{
		coord: {x: 5, y: 5},
		colorfg: "#0000FF",
		colorbg: "#9999FF",
	}

	snake1 = new snake_object("#00FF00", "#99FF99");
	snake2 = new snake_object("#FF0000", "#FF9999");
	snake1.create_proto(1);
	snake2.create_proto(3);
	waiting();
//	console.log(c);
//	ctx.transform(100, 100); //Sets 100, 100 as the new origin
}

function main()
{	
	pause_overlay.style.visibility = "hidden";
	for (var i = 0; i < totalx; i++)
		for (var j = 0; j < totaly; j++)
			drawcell(i, j, colorfg, colorbg);
//	food.coord = gen_random_xy();
	drawcell(food.coord.x, food.coord.y, food.colorfg, food.colorbg);
//	console.log(snake1);
	snake1.draw();
	snake2.draw();
	music.play();
	recurse = setInterval(putsnakes, speedfactor);
}

function end_game(loser, reason)
{
	clearInterval(recurse);
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

function waiting()
{
	pause_message.innerHTML = "";
	pause_message.innerHTML += "<img src = 'images/loading.gif'> </img> <br /><br />";
	pause_message.innerHTML += "Waiting for another player to join...";
	pause_overlay.style.visibility = "visible";
}