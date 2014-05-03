var io = require('socket.io').listen(8090);
io.set('log level', 1);
console.log("Running at port: 8090");
var prev = undefined;

io.sockets.on('connection', function (socket) {
		
	if(prev == undefined)
		prev = socket;
	else
	{
		socket.other = prev;		//Make Pairs
		prev.other = socket;
		prev = undefined;

		socket.send("start2");		//Start Game
		socket.other.send("start1");
	}

	socket.on('message', function (msg) { 
		console.log("Message Received: ", msg);
		socket.send(msg);
		if(socket.other != undefined)
			socket.other.send(msg);
	});
	
	socket.on('disconnect', function () {
		console.log("Disconnected :(");
		if(prev==socket)
			prev = undefined;
		else
		{
			if(socket.other != undefined)
			{
				socket.other.send("disconnected");
				socket.other.other = undefined;
			}
		}
	});
});
