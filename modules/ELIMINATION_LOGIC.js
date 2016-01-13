var CURRENT_LEADERBOARD = "tournament_Leaderboard.Round_ID.1";
var numberOfPlayersPromotedToNextRound = 2;
var numberOfPlayersInCurrentRound = 5;

var request = new SparkRequests.LeaderboardDataRequest();


request.entryCount = numberOfPlayersInCurrentRound;
request.leaderboardShortCode = CURRENT_LEADERBOARD

var playerDataCollection = Spark.runtimeCollection("PlayerData");
var response = request.Send();

for each(var player in response.data)
{
    if(player.rank > numberOfPlayersPromotedToNextRound)
    {
        
        playerDataCollection.update({
        	"_id": player.userId,
        }, 
        {
        	"$set": {"isEliminated":1}
        }, 
        false, 
        false 
        );
    }
}