"use strict";
 
(function(){
    var userEmail = Spark.getScriptData("email");
    Spark.getPlayer().setScriptData("email", userEmail);

    var players = Spark.systemCollection('player');
    players.ensureIndex({"scriptData.passwordRecoveryToken" : -1});

    var newPlayer = Spark.getData().newPlayer;
    
    if(newPlayer)
    {
        var activationCode = generateActivationCode(); 
        Spark.getPlayer().setScriptData("accountActivationCode", activationCode);
        Spark.getPlayer().setScriptData("Account_Activated", false);
        Spark.getPlayer().setScriptData("daysLoggedInConsecutively", 0);
        
        var playerId =  Spark.getPlayer().getPlayerId();
        var username =  Spark.getPlayer().getDisplayName();
        var xp = 0;
        var level = 1;
        var coins = 0;
        var totalGamesWon = 0;
        var totalGamesLost = 0;
        var lastSeen =  Spark.getPlayer().getLastSeen();
        var skillPoints = 0;
        var tournamentRound = {"id":0, "name":"round1","won":0,"lost":0};
        var isEliminated = 0;
        
        var decks = Spark.runtimeCollection("testing");
        
        var randomNumber = Math.floor((Math.random()*128));
        
        var randomDeck = decks.find({}, { "characters": 1 , _id:0}).limit(1).skip(randomNumber);
        
        if(randomDeck.hasNext()){
            var deck = randomDeck.next();
            var characters = deck.characters;
            var playerCharacterNames = new Array();
            for(i = 0; i < characters.length; i++)
            {
                playerCharacterNames[i] = deck.characters[i].name;
            }
            var activeCharacterCollectionData = {"_id":playerId, "Characters" : characters};
            Spark.runtimeCollection("ActiveCharacterCollection").insert(activeCharacterCollectionData);
        }
        
        
        var playerDeckOnLoginData = {"_id":playerId, "CharacterNames": playerCharacterNames};
        
        Spark.runtimeCollection("PlayerDeck_ON_LOGIN").insert(playerDeckOnLoginData);
        
        
        var PlayerInitialData = {"_id":playerId,"userName":username,"deck":deck,"xp":xp,"level":level,"coins":coins,"totalGamesWon":totalGamesWon,"totalGamesLost":totalGamesLost,"skillPoints":skillPoints,"isEliminated":isEliminated,"tournamentRound":tournamentRound,"last seen": lastSeen};
        
        // var playerData = { "PlayerData": PlayerInitialData};
        Spark.runtimeCollection("PlayerData").insert(PlayerInitialData);
       
        
   
    }

    function generateActivationCode(){
        return userEmail+"-" + new Date().getTime();
    }
    
    })()