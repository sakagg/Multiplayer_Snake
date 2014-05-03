<?php
$type = $_POST['type'];
$name1 = ($_POST['name1']=="") ? "GreenSnake" : $_POST['name1'] ;
$name2 = ($_POST['name2']=="") ? "RedSnake" : $_POST['name2'] ;
?>

<html>
<head>
	<title>Canvas</title>
	<meta charset="utf-8">
	<style>
		#mycanvas
		{
			position: absolute;
		}
	</style>
</head>
<body>

<script type="text/javascript" src="js/helpers.js"></script>
<script type="text/javascript" src="js/p1_controls.js"></script>

<?php 
if($type == 0)
{
	echo '<script type="text/javascript" src="js/snake_object.js"></script>';
	echo '<script type="text/javascript" src="js/gameplay_1p.js"></script>';
}
else if($type == 1)
{
	echo '<script type="text/javascript" src="js/snake_object.js"></script>';
	echo '<script type="text/javascript" src="js/gameplay_2p.js"></script>';
	echo '<script type="text/javascript" src="js/p2_controls.js"></script>';
}
else if($type == 2)
{
	echo '<script src="http://' . $_SERVER['SERVER_ADDR'] . ':8090/socket.io/socket.io.js"> </script>';
	echo '<script type="text/javascript" src="js/snake_object_online.js"></script>';
	echo '<script type="text/javascript" src="js/gameplay_2p_online.js"></script>';
}
?>

<script type="text/javascript">

var c, ctx, recurse, cw, scw, speedfactor, colorbg, colorfg, totalx, totaly, food, s, music, pause_overlay, pause_message;

var snake1, snake2, control, other, player1, player2;

player1 = "<?php echo $name1; ?>";
player2 = "<?php echo $name2; ?>";

window.addEventListener('load', init_vars);
<?php 
	if($type == 2)
		echo 's = io.connect("http://' . $_SERVER['SERVER_ADDR'] . ':8090/");';
?>

</script>

<?php 
	if($type == 2)
		echo '<script type="text/javascript" src="js/socket.js"></script>';
?>

<canvas id="mycanvas">
	Sorry, your browser does not support Canvas.
</canvas>

<audio id="music" src="media/bgmusic.mp3" loop="true"></audio>
<audio id="food_music" src="media/food.mp3"></audio>
<audio id="bite_music" src="media/bite.mp3"></audio>
<audio id="gameover_music" src="media/gameover.mp3"></audio>

<div id="overlay" style="position: absolute; background: rgba(0, 0, 0, 0.3); visibility: hidden; width:100%; height:100%; top:0; left:0;">
	<span id="pause_message" style="position: absolute; width: 100%; text-align: center; font-size: 1.3em; top: 35%;">
		<strong style="font-size: 3em;">Game Paused <br /> </strong>
		Press [Esc] or [p] to resume.
	</span>
</div>

</body>
</html>
