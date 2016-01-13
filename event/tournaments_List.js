var playerId = Spark.getPlayer().getPlayerId();
var tournamentsList = Spark.runtimeCollection("Tournaments_Admin").find();
Spark.setScriptData("tournamentsList", tournamentsList);