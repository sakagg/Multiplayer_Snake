s.on('connect', function()
{
	s.on('message', function(msg)
	{
//		console.log(msg);
		if(msg == "start1")
		{

			control = snake1;
			other = snake2;
			control.id = "1";
			main();

//			window.addEventListener("always", main);
		}
		else if (msg == "start2")
		{
			control = snake2;
			other = snake1;
			control.id = "2";
			main();
		}
		else if (msg == "disconnected")
		{
			end_game(other, "it left the game");
		}
		else if (msg[0] == "(")
		{
			var cord = msg.slice(1,msg.length-1);
			cord = cord.split(',');
			food.coord.x = parseInt(cord[0]);
			food.coord.y = parseInt(cord[1]);
		}
		else if (msg[0] == "1")
		{
			var cord = msg.slice(2,msg.length-1);
			cord = cord.split(',');
			snake1.draw(window);
			snake1.moveitbaby(parseInt(cord[0]), parseInt(cord[1]));
			fixintercollision();
			snake1.draw();
		}
		else if (msg[0] == "2")
		{
			var cord = msg.slice(2,msg.length-1);
			cord = cord.split(',');
			snake2.draw(window);
			snake2.moveitbaby(parseInt(cord[0]), parseInt(cord[1]));
			fixintercollision();
			snake2.draw();
		}
	})
})