(
    function(){
        
        var consumeQuantity = Spark.getData().quantity;
        var shortCode = Spark.getData().shortCode;
        var item = Spark.getData().scriptData.item;
        var itemId = Spark.getData().scriptData.id;
        var itemName = Spark.getData().scriptData.name;
        var itemAttribute = Spark.getData().scriptData.attribute;
        var requiredCharacter;
        
        if(item == "Tournament")
        {
            var tournamentDetails = Spark.runtimeCollection("Tournaments_Admin").find({"_id": { "$oid" : itemId}},{"value":1,"type":1});
            while(tournamentDetails.hasNext())
            {
                var tournament = tournamentDetails.next();
                var tournamentType = tournament.type;
                var tournamentValue = tournament.value;
            }
            if(consumeQuantity == tournamentValue && tournamentType == shortCode)
            {
                var playerVGOOD = Spark.getPlayer().hasVGood(shortCode);
                if(playerVGOOD >= consumeQuantity){
                  require("TOURNAMENT_REGISTRATION");
                  var result = registerTournament(itemId);
                  if(result != "error")
                  {
                    var transaction = {"playerId": Spark.getPlayer().getPlayerId(), "itemSpent": shortCode, "consumedQuantity": consumeQuantity,"purchasedItemType":item,"purchasedItemName": itemName, "date": new Date()};
                    Spark.runtimeCollection("VirtualGood_Transactions").insert(transaction);
                    Spark.setScriptData("result", "Tournament Registration Success");
                  }
                }else{
                    Spark.setScriptData("ERROR", "INSUFFICIENT vGood");
                }
            }
        }else if(item == "Card")
        {
            if(itemAttribute == "Card"){
                var tournamentDetails = Spark.runtimeCollection("DefaultCollection").findOne();   
                var temp = 0;
                var characters = tournamentDetails.Collection_Of_Cards;
                for(i = 0; i < characters.length; i++)
                {
                    var characterName = characters[i].Character;
                    if(characterName == itemName)
                    {
                         requiredCharacter = characters[i];
                         requiredCharacter.name = characters[i].Character;
                         delete requiredCharacter["Character"];
                         //TODO: Need to add group for character.
                        temp++;
                        break;
                    }
                }
                if(temp > 0)
                {
                     var tournamentDetails = Spark.runtimeCollection("ActiveCharacterCollection").findOne({"_id":Spark.getPlayer().getPlayerId()});   
                    var temp = 0;
                    var characters = tournamentDetails.Characters;
                    
                    for(i = 0; i < characters.length; i++)
                    {
                        var characterName = characters[i].name;
                        if(characterName == itemName)
                        {
                           
                            temp++;
                            break;
                        }
                    }
                    if(temp > 0)
                    {
                        Spark.setScriptData("Error", "Character exist");
                    }
                    else
                    {
                        var playerVGOOD = Spark.getPlayer().hasVGood(shortCode);
                        if(playerVGOOD >= consumeQuantity){
                        var result = Spark.runtimeCollection("ActiveCharacterCollection").update({"_id":Spark.getPlayer().getPlayerId()},{"$push":{"Characters": requiredCharacter}});
                        if(!result)
                          {
                            var transaction = {"playerId": Spark.getPlayer().getPlayerId(), "itemSpent": shortCode, "consumedQuantity": consumeQuantity,"purchasedItemType":item,"purchasedItemName": itemName, "date": new Date()};
                            Spark.runtimeCollection("VirtualGood_Transactions").insert(transaction);
                            Spark.setScriptData("result", "Card unlock success");
                          } 
                        }else{
                            Spark.setScriptData("ERROR", "INSUFFICIENT vGood");
                        }
                    }
                }
                else
                {
                    Spark.setScriptData("error", "Character doesn't exist");
                }
            
            }       
            
            }else if(item == "GOLD"){
                if(shortCode != "GEM"){
                    Spark.setScriptData("error", "Cant buy gold with gold");
                }else{
                    //TODO: Get data from DB regarding gem and Gold Ratio.
                    var quantity = consumeQuantity * 5;
                    
                    Spark.getPlayer().credit2(quantity);
                    var request = new SparkRequests.BuyVirtualGoodsRequest();
                    request.currencyType = 2;
                    request.quantity  = quantity;
                    request.shortCode = item;
                    var response = request.Send();
                    if(!response.error){
                    
                        var transaction = {"playerId": Spark.getPlayer().getPlayerId(), "itemSpent": shortCode, "consumedQuantity": consumeQuantity,"purchasedItemType":item,"purchasedItemQuantity": quantity, "date": new Date()};
                         
                        Spark.runtimeCollection("VirtualGood_Transactions").insert(transaction);
                        Spark.setScriptData("success", "purchased gold successfully");
                    }
                    
                }
                
            }
        }
    
    )()