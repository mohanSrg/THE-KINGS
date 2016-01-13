(function(){
    
    
        var playerData = Spark.getData().data;
        var playerId = Spark.getPlayer().getPlayerId();
        
        
        var playerDataList = Spark.runtimeCollection("PlayerData");
        
        playerDataList.update({
        	"_id": playerId,
        }, 
        {
        	"$set": playerData
        }, 
        true, 
        false 
        );
    
    })()