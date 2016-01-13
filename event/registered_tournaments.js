(function(){
    
        var playerId = Spark.getPlayer().getPlayerId();
        var tournamentsRegisteredList = Spark.runtimeCollection("Tournament_Registration").find({"playerId": playerId});
        
            Spark.setScriptData("registeredTournamentsList", tournamentsRegisteredList);
    
    })()