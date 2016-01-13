var playerid = Spark.getPlayer().getPlayerId();

var playerDataCollection = Spark.runtimeCollection("PlayerData");
var player = playerDataCollection.findOne({"_id":playerid},{"totalGamesWon":1,"totalGamesLost":1});

if(!player)
{
    throw "sldk";
}
var playerWins = player.totalGamesWon;
var playerLosses = player.totalGamesLost;

var response  = Spark.sendRequest({
 "@class": ".LogEventRequest",
 "eventKey": "playerWin",
 "wins": playerWins,
 "losses": playerLosses
});