(function(){
    
        var accountStatus = Spark.getPlayer().getScriptData("Account_Activated");
          
        if(accountStatus){
            Spark.setScriptData("account_status", "activated");
        }
        else
        {
            Spark.setScriptError("Need_Account_Activation", {"Message": "You didn't activated your account yet...Account Activation pending."})
        }
    
    })()