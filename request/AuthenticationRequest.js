"use strict";

(function(){
    
    var status = "Started";
    
    if(Spark.data.scriptData){ 

        var action = Spark.data.scriptData.action;

        if("passwordRecoveryRequest" === action)
        {
            require("START_RECOVERY");
            require("SEND_RECOVERY_EMAIL");
            status = startRecovery(Spark.data.scriptData);
        }else if ("resetPassword" === action)
        {   
            require("RESET_PASSWORD");
            status = resetPassword(Spark.data.scriptData);
        }else
        {
            status = "invalid action";
        }
    
        Spark.setScriptError("action", status);
    }
    else
    {
        var userName = Spark.getData().userName;
        
        var accountStatus = false;
        
        var player = Spark.systemCollection("player").findOne({"userName" : userName});
        if(!player)
        {
            Spark.setScriptError("Invalid Credentials", "username invalid");
            
        }
        else
        {
        accountStatus = player.scriptData.Account_Activated;
        if(accountStatus){
            Spark.setScriptData("account_status", "activated");
          
            
        }
        else
        {
            Spark.setScriptError("Need_Account_Activation", {"Message": "You didn't activated your account yet...Account Activation pending."});
            
        }
        }
    }
})()