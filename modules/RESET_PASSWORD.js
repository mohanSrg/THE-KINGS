"use strict";

    function resetPassword(requestScriptData){
        if(!requestScriptData.token || !requestScriptData.password){
            return "Password or token variable not passed in"; 
            
        }
        var playerID = Spark.systemCollection("player").findOne({"scriptData.passwordRecoveryToken" : requestScriptData.token},{_id:1});
        
        if(!playerID){
            return "invalid token";
        }
        var player = Spark.loadPlayer(playerID._id.$oid);
        player.setScriptData("passwordRecoveryToken", null); 
        var changePasswordRequest = new SparkRequests.ChangeUserDetailsRequest();
        changePasswordRequest.newPassword = requestScriptData.password;
        changePasswordRequest.SendAs(player.getPlayerId());
        return "Password has changed."; 
    }