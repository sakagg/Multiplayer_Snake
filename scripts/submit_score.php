<?php
$name = $_GET['name'];
$score = $_GET['score'];

if($name=="" || $score=="")
	die("INVALID DATA");

include "connect_to_mysql.php";

mysql_query("INSERT INTO highscores VALUES ('', '$name', '$score')");

$sql = mysql_query("SELECT score FROM highscores ORDER BY score DESC");
if(mysql_num_rows($sql) > 10)
{
	$rows = array();
	while($row = mysql_fetch_assoc($sql))
		$rows[] = $row;
	$minscore =  $rows[9]['score'];
	mysql_query("DELETE FROM highscores WHERE score < '$minscore'");
}
?>