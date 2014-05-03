function move2(x)
{
//	console.log(x.which);
	if(x.which==65 && snake2.dir!=3)
		snake2.dir = 1;
	else if(x.which==87 && snake2.dir!=4)
		snake2.dir = 2;
	else if(x.which==68 && snake2.dir!=1)
		snake2.dir = 3;
	else if(x.which==83 && snake2.dir!=2)
		snake2.dir = 4;

	window.removeEventListener('keyup', move2);
	
	setTimeout(function() {
		window.addEventListener('keyup', move2);
	}, speedfactor*0.75);

//	console.log(snake1.dir);
}

window.addEventListener('keyup', move2);