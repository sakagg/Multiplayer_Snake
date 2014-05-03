function snake_object(colorfg, colorbg)
{
	this.dir = 3;
	this.colorbg = colorbg;
	this.colorfg = colorfg;
	this.score = 0;
	this.positions = [];
//	console.log(this);

	this.printer = function()
	{
		console.log(this==snake1, this==snake2);
	}

	this.draw = function(colorNS)
	{
//		console.log(colorNS);
		if(colorNS == undefined)
			colorNS = this;
//		console.log(colorNS);
		var pos;
		for (var i = this.positions.length - 1; i >= 0; i--)
		{
			pos = this.positions[i]
			drawcell(pos.x, pos.y, colorNS.colorfg, colorNS.colorbg);
		}
	}

	this.collided = function(x, y)
	{
		for (var i = this.positions.length - 1; i >= 0; i--)
			if(this.positions[i].x == x && this.positions[i].y == y)
				return true;
		return false;
	}

	this.poptill = function(x, y)
	{
//		console.log("Aa Gaya");
		var tmp;
		tmp = this.positions.pop();
		drawcell(tmp.x, tmp.y, window.colorfg, window.colorbg);
		console.log(tmp.x, tmp.y);
//		console.log(x, y);
		while(tmp.x!=x || tmp.y!=y)
		{
//			console.log(tmp.x, tmp.y);
			tmp = this.positions.pop();
			drawcell(tmp.x, tmp.y, window.colorfg, window.colorbg);
			console.log(tmp.x, tmp.y);
		}
		pause_all_music();
		document.getElementById('bite_music').play();
	}

	this.calculatenext = function()
	{
		var headx, heady;
		headx = this.positions[0].x;
		heady = this.positions[0].y;
		if(this.dir == 1)			//Left
			headx--;
		else if(this.dir == 2)		//Up
			heady--;
		else if(this.dir == 3)		//Right
			headx++;
		else if(this.dir == 4)		//Down
			heady++;

		if(headx == -1)
			headx = totalx - 1;
		else if(headx == totalx)
			headx = 0;
		if(heady == -1)
			heady = totaly - 1;
		else if(heady == totaly)
			heady = 0;

		s.send(this.id + "[" + headx + "," + heady + "]");
	}

	this.moveitbaby = function(nhx, nhy)
	{
		var headx, heady;
		headx = nhx;
		heady = nhy;
	
		if(food.coord.x==headx && food.coord.y==heady)
		{
			this.score++;
			if(control == this)
			{
				food.coord = gen_random_xy();
				pause_all_music();
				document.getElementById('food_music').play();
				s.send("("+food.coord.x+","+food.coord.y+")");
			}
		}
		else
			this.positions.pop();

		if(this.collided(headx, heady))
		{
			end_game(this, "it bit itself");
			console.log(snake1.score, snake2.score);
		}
	
		this.positions.unshift({x:headx, y:heady});
	}

	this.create_proto = function(dir)
	{
		var def_snake_length = 5;
		var coord;
		if(dir == 3)
		{
			for (var i = def_snake_length - 1; i >= 0; i--)
			{
				coord = {x:i+1, y:1};
				this.positions.push(coord);
//				drawcell(coord.x, coord.y, this.colorfg, this.colorbg);
			}
			this.dir = 3;
		}
		else if(dir == 1)
		{
			for(var i = 0; i < def_snake_length; i++)
			{
				coord = {x:totalx - def_snake_length - 1 + i, y: totaly - 2};
				this.positions.push(coord);
//				drawcell(coord.x, coord.y, this.colorfg, this.colorbg);
			}
			this.dir = 1;
		}
	}

}