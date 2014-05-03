function move1(x)
{
//	console.log(x.which);
	var dir = 0;
	if(x.which==37 && control.dir!=3)
		dir = 1;
	else if(x.which==38 && control.dir!=4)
		dir = 2;
	else if(x.which==39 && control.dir!=1)
		dir = 3;
	else if(x.which==40 && control.dir!=2)
		dir = 4;
	if(dir!=0)
	{
		control.dir = dir;

//	snake2.dir = (control.dir+1) % 4 + 1;	//Move Snakes in Opposite Direction

		window.removeEventListener('keyup', move1);
		
		setTimeout(function() {
			window.addEventListener('keyup', move1);
		}, speedfactor*0.75);
	}
	else if(x.which==27 || x.which==80)		//Esc OR p
		pause_game();

//	console.log(control.dir);
}

window.addEventListener('keyup', move1);