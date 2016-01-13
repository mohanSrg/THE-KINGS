(function(){
    
        var playerid = Spark.getPlayer().getPlayerId();
        var playerDeckBeforeGame = Spark.getData().Player_Data;
        
        var players = Spark.runtimeCollection("PlayerData");
        var playerObject = players.findOne({ "_id": playerid});
        
         var result; 
        
        var playerdeck = playerObject.deck;
        
        
        if(JSON.stringify(playerdeck) === JSON.stringify(playerDeckBeforeGame)){
             result = "both are identical";
        }else{
            result  = "decks are not same";
        }
        
        Spark.setScriptData("result", result);
    
    })()