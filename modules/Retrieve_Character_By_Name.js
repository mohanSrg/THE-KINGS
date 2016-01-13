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