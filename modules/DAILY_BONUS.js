function daysInARow()
    {
    
        var daysInARow = Spark.getPlayer().getScriptData("daysLoggedInConsecutively");
        var lastLogin = Spark.getPlayer().getScriptData("lastLogin");
        var currentTime = new Date();
        
        var timeSinceLastLogin = currentTime - lastLogin;
         
        
        if(timeSinceLastLogin > 86400 && timeSinceLastLogin < 172800){
            daysInARow++;
        }
         
        
        if(timeSinceLastLogin > 17280)
        {
            daysInARow = 0;
        }
         
        Spark.getPlayer().setScriptData("daysLoggedInConsecutively", daysInARow);
        Spark.getPlayer().setScriptData("lastLogin", new Date());
    
        return daysInARow;
    
    }