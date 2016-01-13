function registerTournament(tournamentId){
    
    var playerId = Spark.getPlayer().getPlayerId();
    var current_Time = new Date();
    
    var roundsCursor = Spark.runtimeCollection("Tournaments_Admin").find({"_id": { "$oid": tournamentId }}, {"rounds":1,"_id":0});
    if(roundsCursor.hasNext())
    {
         
        var roundsObject = roundsCursor.next();
        
    
        var tournament = {"tournamentId": tournamentId, "registrationDate": current_Time};
        
        var tournamentsRegistered = Spark.runtimeCollection("Tournament_Registration").find({"playerId": playerId});
        if(tournamentsRegistered.hasNext())
        {
            var playerTournament = tournamentsRegistered.next();
            var tournaments = playerTournament.tournaments;
            
            var registered;
            for(i = 0; i < tournaments.length; i++)
            {
                var tournamentRegisterdID = tournaments[i].tournamentId;
                
                if(tournamentRegisterdID == tournamentId)
                {
                    registered = true;
                    
                    break;
                }
                else
                {
                    registered = false;
                }
            }
            
            if(registered)
            {
                Spark.setScriptData("Message", "You have alread registered for this tournament");
                return "error";
            }
            else
            {
                var tournamentRoundLeaderboardData = {"playerId":playerId, "tournamentId": tournamentId, "rounds": roundsObject.rounds};
                Spark.runtimeCollection("TournamentRoundLeaderboard").insert(tournamentRoundLeaderboardData);
                Spark.runtimeCollection("Tournament_Registration").update({"playerId":playerId}, {"$addToSet": {"tournaments":tournament}})        
                
                Spark.setScriptData("Message", "Tournament Registration Successfull.");
                return "success";
            }
            
            
        }
        else
        {
            
            var tournamentRoundLeaderboardData = {"playerId":playerId, "tournamentId": tournamentId, "rounds": roundsObject.rounds};
            Spark.runtimeCollection("TournamentRoundLeaderboard").insert(tournamentRoundLeaderboardData);
            var tournaments = new Array(tournament);
            
            var registrationData = {"playerId": playerId, "tournaments": tournaments};
            Spark.runtimeCollection("Tournament_Registration").insert(registrationData);
            Spark.setScriptData("Message", "Tournament Registration Successfull.");
            return "success";
            
        }
    }
    else
    {
        Spark.setScriptData("Message", "There's is no tournament like that");
        return "error";
    }
    
    }