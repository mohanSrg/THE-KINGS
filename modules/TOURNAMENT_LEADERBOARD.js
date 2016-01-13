var playerDataCollection = Spark.runtimeCollection("PlayerData");
        if(win)
        {
            var player = playerDataCollection.findOne({"_id":playerid},{"isEliminated":1, "tournamentRound":1});
            var playerWins = player.tournamentRound.won;
            var playerLosses = 0;
            var isEliminated = player.isEliminated;
            var id = player.tournamentRound.id;
            Spark.setScriptData("playerWins", playerWins);
        }
        else
        {
             var player = playerDataCollection.findOne({"_id":playerid},{"isEliminated":1,"tournamentRound":1});
             var playerLosses = player.tournamentRound.lost;
             var playerWins = 0;
             var isEliminated = player.isEliminated;
             var id = player.tournamentRound.id;
             Spark.setScriptData("playerLost", playerLosses);
        }
       
        if(id != 0)
        {
            var EVENT_KEY = "tournament_Leaderboard.Round_ID."+id;
            var response  = Spark.sendRequestAs({
                "@class": ".LogEventRequest",
                "eventKey": EVENT_KEY,
                "wins": playerWins,
                "losses": playerLosses,
                "IsEliminated":isEliminated
                }, playerid);
        }