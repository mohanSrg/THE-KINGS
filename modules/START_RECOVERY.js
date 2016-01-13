function startRecovery(requestScriptData){
        if(!requestScriptData.email){
              
            return "email variable not passed in";
        }
        var playerID = Spark.systemCollection("player").findOne({"scriptData.email" : requestScriptData.email},{_id:1});
        if(!playerID){
            
            return  "invalid Player"; ;
        }
        var token = generateRecoveryToken(requestScriptData.email);
        var player = Spark.loadPlayer(playerID._id.$oid);
        player.setScriptData("passwordRecoveryToken", token); 
     // sendRecoveryEmail(request.email, playerId.displayName, token);
        return "Token Sent to your mail...please check"; 
    }
    
    function generateRecoveryToken(userEmail){
        return userEmail+"-" + new Date().getTime();
    }