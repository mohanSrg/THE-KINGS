(function(){
    
    var gold = Spark.getData().noOfGold;
    var playersCollection = Spark.runtimeCollection("PlayerData");
    var players = playersCollection.find();

    while(players.hasNext())
    {
        var player = players.next();
        var playerID = player._id;
        Spark.setScriptData("playerid", playerID);
        
        var sparkPlayer = Spark.loadPlayer(playerID);
        sparkPlayer.addVGood("GOLD", gold);
        Spark.setScriptData("MSG", "Gold updated");
        
    }
    
    })()