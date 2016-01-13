(function(){
    
            //validate player character in each turn
        
        //retrieve current player id and the character that player has sent
        var playerid = Spark.getPlayer().getPlayerId();
        var characterFromClient = Spark.getData().character;
        
        var characterNameFromClient = characterFromClient.name;
        
        //retrieve the character from DB based on character name the player has sent
        
        require("Retrieve_Character_By_Name");
        
        if(JSON.stringify(characterFromClient) === JSON.stringify(characterFromServer)){
             result = "characters are identical";
        }else{
            result  = "characters are not same....you are a hacker";
        }
        
        Spark.setScriptData("result", result);
    
    })()