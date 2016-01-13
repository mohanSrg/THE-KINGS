(function(){
    
    var errors = Spark.getData().error;
    
    if(errors)
    {
       Spark.setScriptError("Invalid Credentials", "invalid user");
       
    }
    else
    {
        var playerId = Spark.getPlayer().getPlayerId();
        var playerLoginDeck = Spark.runtimeCollection("PlayerDeck_ON_LOGIN").findOne({"_id":playerId},{_id:0});
        var playerLoginActiveCollection = Spark.runtimeCollection("ActiveCharacterCollection").findOne({"_id":playerId},{_id:0});
        
        var characters = playerLoginActiveCollection.Characters;
        var character, name, level, attack, health, armour, balancingWeight, ranged, attackMultiplier, healthMultiplier, group;
        var number = [1,2,3,4,5];
        var dict = [];
        var obj = {};
        for(i = 0 ; i < characters.length; i++)
        {
            character = characters[i];
            var CharacterName =   character.name;
            var value = character ;
            
            obj[CharacterName] = value;
            
        }    
        dict.push(obj);
        
        require("DAILY_BONUS");
        var daysLoggedInConsecutively = daysInARow();
       
        Spark.setScriptData("daysLoggedInConsecutively", daysLoggedInConsecutively);
        Spark.setScriptData("deck",playerLoginDeck.CharacterNames);
        Spark.setScriptData("activeCollection",JSON.stringify(dict[0]));
        
    }
    
    })()