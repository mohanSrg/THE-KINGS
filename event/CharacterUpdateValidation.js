var playerdata = Spark.getData().CharacterUpgradeData;
var characterNameFromClient = playerdata.name;
var coinsSpent = playerdata.CoinsSpent;
var attributeType = playerdata.AttributeType;

var playerid = Spark.getPlayer().getPlayerId();

var playerData = Spark.runtimeCollection("PlayerData");

var deckCursor = playerData.findOne({ "_id": playerid});

var deck = deckCursor.deck.characters;

var characterFromServer;
for( i = 0; i < deck.length; i++)
{
    var characterNameFromServer = deck[i].name;
    
    if(characterNameFromClient == characterNameFromServer)
    {
        characterFromServer = deck[i];
        break;
    }
}

var cardType =  characterFromServer.ranged;
var collection = Spark.runtimeCollection("AttributeUpgradeDetails");
if(cardType == 0)
{
    var attributeDetailsFromServer = collection.findOne({"Type":"Ranged"},{attributeType:1,"_id":0});
    var sdfa = "moshsssdks";
    var sdkfl= "dddddddddddddk";
    
    
    
}