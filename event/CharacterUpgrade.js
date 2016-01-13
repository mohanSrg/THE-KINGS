(function(){
    
        var playerdata = Spark.getData().CharacterUpgradeData;
        var characterNameFromClient = playerdata.name;
        var coinsSpent = playerdata.CoinsSpent;
        var attributeType = playerdata.AttributeType;
        var cardLevel = playerdata.Level;
        
        require("Retrieve_Character_By_Name");
        
        var cardType =  characterFromServer.ranged;
        var collection = Spark.runtimeCollection("AttributeUpgradeDetails");
        var coinsRequired;
        if(cardType == 0)
        {
            var attributeDetailsFromServer = collection.findOne({"Type":"Ranged"},{"_id":0});
           // var attribute = attributeDetailsFromServer.attributeType;
            
             var keysOFattributeDetailsFromServer = Object.keys(attributeDetailsFromServer);
            for(i = 0; i < keysOFattributeDetailsFromServer.length; i++)
            {
                var attributeFromServer = keysOFattributeDetailsFromServer[i];
                if(attributeType == attributeFromServer)
                {
                    //contains level objects
                    var attributeLevels = attributeDetailsFromServer[attributeType];
                    
                    for(i = 0; i < attributeLevels.length; i++)
                    {
                        var levelFromServer = attributeLevels[i].Level;
                        if(cardLevel == levelFromServer)
                        {
                             coinsRequired = attributeLevels[i].CoinsRequired;
                             break;
                        }
                        
                    }
                    
                 break;   
                }
            }
            var message;
            if(coinsSpent == coinsRequired)
            {
                //if the player has spent correct number of required coins to increase card attributes...its a valid transaction
                 message = "valid transaction";
            }
            else
            {
                 message = "i think you are a hacker...not a valid transaction";
            }
            Spark.setScriptData("Message", message);
           
            
            
        }
    
    
    })()