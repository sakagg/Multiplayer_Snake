<html>
<head>
	<title>LEADERBOARD</title>
</head>
<body>
	<?php
	include "scripts/connect_to_mysql.php";
	$sql = mysql_query("SELECT nick, score FROM highscores ORDER BY score DESC LIMIT 10");
	$rows = array();
	while($row = mysql_fetch_assoc($sql))
		$rows[] = $row;
	?>

	<script type="text/javascript">
	function main()
	{
		var para = document.getElementById('highscores');
		var all = <?php echo json_encode($rows) ?>;
		for (var i = 0; i < all.length; i++) {
			para.innerHTML += all[i]['nick'] + ": " + all[i]['score'] + "<br>";	
		};
	}

	window.addEventListener('load', main);
	</script>

	<p id="highscores">
		<strong>Player&nbsp;&nbsp;&nbsp;&nbsp;Score</strong><br>
	</p>
</body>
</html>