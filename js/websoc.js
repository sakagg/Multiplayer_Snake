try 
{
	var host = "ws://localhost:9110/";
	console.log("Host:", host);
	
	s = new WebSocket(host);
	
	s.onopen = function (e) {
		console.log("Socket opened.");
	};
	
	s.onclose = function (e) {
		console.log("Socket closed.");
	};
	
	s.onmessage = function (e)
	{
//		console.log("Socket message:", e.data);
		if(e.data == "start1")
		{

			control = snake1;
			other = snake2;
			control.id = "1";
			main();

//			window.addEventListener("always", main);
		}
		else if (e.data == "start2")
		{
			control = snake2;
			other = snake1;
			control.id = "2";
			main();
		}
		else if (e.data[0] == "(")
		{
			var cord = e.data.slice(1,e.data.length-1);
			cord = cord.split(',');
			food.coord.x = parseInt(cord[0]);
			food.coord.y = parseInt(cord[1]);
		}
		else if (e.data[0] == "1")
		{
			var cord = e.data.slice(2,e.data.length-1);
			cord = cord.split(',');
			snake1.draw(window);
			snake1.moveitbaby(parseInt(cord[0]), parseInt(cord[1]));
			fixintercollision();
			snake1.draw();
		}
		else if (e.data[0] == "2")
		{
			var cord = e.data.slice(2,e.data.length-1);
			cord = cord.split(',');
			snake2.draw(window);
			snake2.moveitbaby(parseInt(cord[0]), parseInt(cord[1]));
			fixintercollision();
			snake2.draw();
		}
/*		else
		{
			if(e.data[0] == "1")
				snake1.dir = parseInt(e.data[1]);
			else if(e.data[0] == "2")
				snake2.dir = parseInt(e.data[1]);
		}
*/	};
	
	s.onerror = function (e) {
		console.log("Socket error:", e);
	};
}
catch(ex)
{
	console.log("Socket exception:", ex);
}
