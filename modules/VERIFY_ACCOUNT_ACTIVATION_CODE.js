function verifyAccountActivationCode(){
        
        var accountActivationCodeFromClient = Spark.getData().accountActivationCode;
    
        var players = Spark.systemCollection('player');
        players.ensureIndex({"scriptData.passwordRecoveryToken" : -1});
    
    
        var playerId = players.findOne({"scriptData.accountActivationCode" : accountActivationCodeFromClient}, {_id : 1});
        var status, accountCode;
        if(!playerId){
            //Spark.getPlayer().resetAuthTokens();
            //Spark.getPlayer().setScriptData("Account_Activated", false);
            status = "Account not activated.";
            accountCode = "Invalid";
        }else{
            var player = Spark.loadPlayer(playerId._id.$oid);
            var accountStatus = player.getScriptData("Account_Activated");
            if(accountStatus)
            {
                status = "Account already activated.";
                accountCode = "Invalid";
            }
            else
            {
                player.setScriptData("Account_Activated", true);
                // status = player.getScriptData("Account_Activated");
                status = "Account Activated";
                accountCode = "Valid";
            }
        }
        
        var result = {"status":status,"accountCode":accountCode};
        return result;
    }