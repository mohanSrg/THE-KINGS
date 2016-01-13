// function updateToLeaderBoard()
//     {
//         updateLeaderboardPlayer(playerWonID, true);
//         updateLeaderboardPlayer(playerLostID, false);
//     }
//     function updateLeaderboardPlayer(playerid, win)
//     {
//         var playerDataCollection = Spark.runtimeCollection("PlayerData");
//         if(win)
//         {
//             var player = playerDataCollection.findOne({"_id":playerid},{"totalGamesWon":1,"isEliminated":1});
//             var playerWins = player.totalGamesWon;
//             var playerLosses = 0;
//             var isEliminated = player.isEliminated;
//             Spark.setScriptData("playerWins", playerWins);
//         }
//         else
//         {
//              var player = playerDataCollection.findOne({"_id":playerid},{"totalGamesLost":1,"isEliminated":1});
//              var playerLosses = player.totalGamesLost;
//              var playerWins = 0;
//              var isEliminated = player.isEliminated;
//              Spark.setScriptData("playerLost", playerLosses);
//         }
//         // if(!player)
//         // {
//         //     throw "sldk";
//         // }
        
//         var response  = Spark.sendRequestAs({
//          "@class": ".LogEventRequest",
//          "eventKey": "playerWin",
//          "wins": playerWins,
//          "losses": playerLosses,
//          "IsEliminated":isEliminated
//         }, playerid);
        
// }