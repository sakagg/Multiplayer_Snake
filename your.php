<!doctype html>
<html>
	<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<link href='http://fonts.googleapis.com/css?family=Fredericka+the+Great' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="my.css">

	</head>
	<body>
		<!--<video>
			<source="./vid.mp4" type="mp4">
		</video>--> 
		<div id="top-line"></div>
		<div id="nav-container">
			<div id="nav">
				<div id="nav-left">
					SNAKETRIX
				</div>
			</div>
		</div>	
		<div id="top-center-container">
			<div id="top-center"><!--
				--><img id="left-bar" class="sidebar" src="Images/sidebar-left.png"><!--
				--><img id="top-center-img" src="Images/center-home.png"><!--
				--><img id="right-bar" class="sidebar" src="Images/sidebar-right.png"><!--
				--></div>
		<div id="players"><!-- To be created when someone clicks on single or multiplayer-->
			<!--<form name="input" action="send_to_2g_link.com" method="get">
				Player1 Name: <input type="text" name="p1" /><input type="submit" name="Submit" value="Let's Play"><br />
				Player2 Name: <input type="text" name="p2" /><input type="submit" name="Submit" value="Let's Play"><br />
			</form>-->
		</div>
		<div id="center-container">
			<div id="center">
				
				<div id="center-box">
				<div id="center-bar"><img src="Images/center-bar.png"></div>
					<div id="main-content">
					</div>
				</div>	
			</div>
		</div>		
			<script>
		window.onload = function(){

			var a = <?php echo $_GET["type"]; ?>;
			//a.classList.remove("active");
			//this.classList.add("active");
			var text,player_txt;
			if(a==0) 
			{
				<?php
					if($_GET['type']==0)
					{
						include "scripts/connect_to_mysql.php";
						$sql = mysql_query("SELECT nick, score FROM highscores ORDER BY score DESC LIMIT 10");
						$rows = array();
						while($row = mysql_fetch_assoc($sql))
							$rows[] = $row;
					}
					else
						$rows = "nothing";
				?>

				text='<br /><p class="single-content" style="text-align:center;font-size:50px;">GAME OVER <?php echo $_GET["winner"]; ?></p><br>';
				var p1='<p class="single-content" style="text-align:center;font-size:35px;">Your Score : <?php echo $_GET["score1"]; ?> </p>';
				//uncomment kar lena php se dalne ke liye
				
				var p01='<br><p class="multi-content" style="text-align:center;font-size:35px;"><u>Global HighScores</u></p>'
				var p21='<table width=50% class="multi-table" style="padding-right:3%;">';
				var p31='<tr><th style="font-size:30px;">Player Name</th><th style="font-size:30px;">Score</th></tr>';
				
				var p2 = "";
				var all = <?php echo json_encode($rows) ?>;
				for (var i = 0; i < all.length; i++) {
					p2 += '<tr><td style="font-size:25px;">' + all[i]['nick'] + '</td><td style="font-size:25px;">' + all[i]['score'] + '</td></tr>';
				};

				var p4='<p class="single-content" style="text-align:center;font-size:35px;">Want to Play Again?</p>';
				var p5='</p>';
				//var p6='<div id="player_name-conatainer"><div id="player_name"><form name="input" action="snake.php" method="get">';
				//var p7='Enter Your Name : <input type="text" name="type" value="3" style="display:none;"/><input type="text" name="p1" required/><br /><input type="submit" name="Submit" value="Let'
				//var p8='s Play"><br /></form></div></div>';
				text=text+p1+p4+p01+p21+p31+p2+p5;
				//player_txt=p6+p7+p8;
				document.getElementById("top-center-img").src="Images/center-single.png";
				document.getElementById('center-box').innerHTML=text;
				document.getElementById('center-box').style.overflow="scroll";
				//document.getElementById('players').innerHTML=player_txt;
			}
			else if(a==1 || a==2)
			{
				text='<br /><p class="single-content" style="text-align:center;font-size:50px;">GAME OVER!</p><br>';
				var p1='<p class="single-content" style="text-align:center;font-size:35px;"><?php echo $_GET["winner"]; ?> Wins! </p>' ;
				var p2='<p class="single-content" style="text-align:center;font-size:35px;"><?php echo $_GET["loser"]; ?> Loses!</p><br>';
				var p3='<p class="single-content" style="text-align:center;font-size:35px;"><?php echo $_GET["winner"]; ?>\'s Score : <?php echo $_GET["score1"]; ?></p>';
				var p4='<p class="single-content" style="text-align:center;font-size:35px;"><?php echo $_GET["loser"]; ?>\'s Score : <?php echo $_GET["score2"]; ?></p>';
				var p5='</p>';
				//var p6='<div id="player_name-container"><div id="player_name"><form name="input" action="snake.php" method="get">';
				//var p7='Enter Your Name : <input type="text" name="type" value="3" style="display:none;"/><input type="text" name="p1" required/><br /><input type="submit" name="Submit" value="Let'
				//var p8='s Play"><br /></form></div></div>';
				text=text+p1+p2+p3+p4+p5;
				//player_txt=p6+p7+p8;
				document.getElementById("top-center-img").src="Images/center-multi.png";
				document.getElementById('main-content').innerHTML=text;
				//document.getElementById('players').innerHTML=player_txt;
			}
/*			else if(a==2)
			{
				text='<br><p class="multi-content" style="text-align:center;font-size:40px;">GAME OVER!!</p>'
				//var p1='<p class="multi-content">In the offline mode two players can play the game  on a same keyboard . Controls for players will be :</p>';
				var p1= '<p class="multi-content" style="text-align:center;font-size:35px;">TechWiz911 Wins!! </p>' ;
				var p18='<p class="multi-content" style="text-align:center;font-size:30px;">Your Score:999</p>'
				var p0='<br><p class="multi-content" style="text-align:center;font-size:35px;"><u>Global HighScores</u></p>'
				var p2='<table width=50% class="multi-table" style="padding-right:3%;">';
				var p3='<tr><th style="font-size:30px;">Rank</th><th style="font-size:30px;">Player Name</th><th style="font-size:30px;">Score</th></tr>';
				var	p4='<tr><td style="font-size:25px;">1</td><td style="font-size:25px;">TechWiz911</td><td style="font-size:25px;">999</td></tr>';
				var p5='<tr><td style="font-size:25px;">2</td><td style="font-size:25px;">2G</td><td style="font-size:25px;">998</td></tr>';	
				var p17='<tr><td style="font-size:25px;">3</td><td style="font-size:25px;">Kunal</td><td style="font-size:25px;">997</td></tr></table>';
	//			var p8='<div id="player_name-conatainer"><div id="player_name"><form id="forms" name="input" action="snake.php" method="get">';
	//			var p9='Player 1 : <input id="type_id" type="hidden" name="type" value="1" /><input type="text" name="name1" required/><br />Player 2 : <input type="text" name="name2" required/><br /><input id="MON" onclick="test(1)" type="submit" name="Submit" value="Play OFFLINE">'
	//			var p10='<input id="MOF" type="submit" name="Submit" value="Play ONLINE" onclick="test(2)">' 
	//			var p11='<br /></form></div></div>';
	//			var rule='<div id="rules"></div>';
				text=text+p1+p18+p0+p2+p3+p4+p5+p17;
				//player_txt=p8+p9+p10;
				document.getElementById("top-center-img").src="Images/center-multi.png";
				document.getElementById('main-content').innerHTML=text;
				//document.getElementById('players').innerHTML=player_txt;
			} 
*/	//	function test(v) {
	//		document.getElementById('type_id').value=v;
		}
		</script>
	</body>
</html>
