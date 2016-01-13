// (function(){
    
//         var playerId =  Spark.getPlayer().getPlayerId();
//         var username =  Spark.getPlayer().getDisplayName();
//         var xp = 0;
//         var level = 1;
//         var coins = 0;
//         var totalGamesWon = 0;
//         var totalGamesLost = 0;
//         var lastSeen =  Spark.getPlayer().getLastSeen();
//         var skillPoints = 0;
//         var tournamentRound = {"id":0, "name":"round1","won":0,"lost":0};
//         var isEliminated = false;
        
//         var decks = Spark.runtimeCollection("testing");
        
//         var randomNumber = Math.floor((Math.random()*128));
        
//         var randomDeck = decks.find({}, { "characters": 1 , _id:0}).limit(1).skip(randomNumber);
        
//         if(randomDeck.hasNext()){
//         var deck = randomDeck.next();
//         }
//         //var cardName = deck.characters[0].name;
        
        
        
//         var PlayerInitialData = {"_id":playerId,"userName":username,"deck":deck,"xp":xp,"level":level,"coins":coins,"totalGamesWon":totalGamesWon,"totalGamesLost":totalGamesLost,"skillPoints":skillPoints,"isEliminated":isEliminated,"tournamentRound":tournamentRound,"last seen": lastSeen};
        
//         // var playerData = { "PlayerData": PlayerInitialData};
//         Spark.runtimeCollection("PlayerData").insert(PlayerInitialData);
//         Spark.getPlayer().setScriptData("PlayerData", PlayerInitialData);
//         Spark.setScriptData("playerData", PlayerInitialData);
//     })()