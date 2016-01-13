function logMatchResultDetails(){
        var matchData = Spark.getData().matchData;
        
        
        var matchResults = JSON.parse(matchData);
                
        Spark.runtimeCollection("MatchDetails").insert(matchResults);
        
        var matchStartTime = matchResults.matchStartTime;
        var tournamentId = matchResults.tournamentId;
        var roundId = matchResults.round;
        var player1 = matchResults.contestants.player1;
        var player2 = matchResults.contestants.player2;
        var winnerId = matchResults.winnerId;
        
        
        
        var playerLostID;
        if(winnerId == player1.id)
        {
            playerLostID = player2.id;
        }
        else
        {
            playerLostID = player1.id;
        }
        
        var playerDataCollection = Spark.runtimeCollection("TournamentRoundLeaderboard");
        var playerWon = playerDataCollection.findOne({"playerId":winnerId, "tournamentId": tournamentId});
        var playerLost = playerDataCollection.findOne({"playerId":playerLostID,  "tournamentId": tournamentId});
      
        var winnerWins;
        var winnerLosses;
        //wins = playerWon["rounds.round"+roundId+".wins"];
        var losserWins;
        var losserLosses;
        
        var i = 1;
        Object.keys(playerWon.rounds).forEach(function(key){
            if(i == roundId)
            {
                winnerWins = playerWon.rounds[key].wins;
                winnerLosses = playerWon.rounds[key].losses;
            }
            i++;
        })
        
        i = 1;
        Object.keys(playerLost.rounds).forEach(function(key){
            if(i == roundId)
            {
                losserWins = playerLost.rounds[key].wins;
                losserLosses = playerLost.rounds[key].losses;
            }
            i++;
            
        })
        
        var updateRoundIdWins = "rounds.round"+roundId+".wins";
         winnerWins++;
        var obj = {};
        obj[updateRoundIdWins] = winnerWins;
        
        playerDataCollection.update({
        	"playerId": winnerId,
        	 "tournamentId": tournamentId
        }, 
        {
        	"$set": obj
        }, 
        true, 
        false 
        );
        
        var updateRoundIdLosses = "rounds.round"+roundId+".losses";
        losserLosses++;
        var obj2 = {};
        obj2[updateRoundIdLosses] = losserLosses;
        
        
        playerDataCollection.update({
        	"playerId": playerLostID,
        	 "tournamentId": tournamentId
        }, 
        {
        	"$set": obj2
        }, 
        true, 
        false 
        );
        
        // //var leaderboardShortCode = "tournament_Leaderboard.round_id."+roundId+"tournament_id."+tournamentId;
        var winnerTotalPlayed = winnerWins + winnerLosses;
        var losserTotalPlayed = losserWins + losserLosses;
        
        updateLeaderboardPlayer(winnerId, winnerWins, winnerTotalPlayed);
        updateLeaderboardPlayer(playerLostID, losserWins, losserTotalPlayed);
        
        function updateLeaderboardPlayer(playerid, wins, totalPlayed)
        {
            var response  = Spark.sendRequestAs({
             "@class": ".LogEventRequest",
             "eventKey": "tournament_Leaderboard",
             "wins": wins,
             "total_games_played": totalPlayed,
             "tournament_id": tournamentId,
             "round_id": roundId
            }, playerid);
        }
        
        var player1 = {"playerId": player1.id, "lastPlayedDate": new Date(matchStartTime)};
        var player2 = {"playerId": player2.id, "lastPlayedDate":new Date(matchStartTime)};
        
        Spark.runtimeCollection("Multiplayer_ActivePlayers").insert(player1, player2);
        
        
        var abc =  new Date(matchStartTime).toISOString();
        //var date = new Date("2016-01-07T06:57:05.739Z");
       // var newDate = date.getFullYear()+ "-" + date.getUTCMonth() + 1 +"-"+ date.getUTCDate() + "T" + date.getUTCHours() +":" + date.getUTCMinutes()+ "Z";
        var response = {"winnerWins":"winnerWins","looserLosses": Date.parse(abc)};
        //var response = {"winner":winnerId,"looser":playerLostID};
        
        //var response = {"winner":matchResults.winnerId};
        
        return response;
        
        
    }