(function(){
    
    var errors = Spark.getData().error;
    
    if(!errors)
    {
    
        var playerId = Spark.getPlayer().getPlayerId();
        var currencyType = this.Spark.getData().scriptData["currencyType"];
        var quantity = this.Spark.getData().scriptData["quantity"];
        var vGood = this.Spark.getData().scriptData["vGood"];
        var purchasedDate = new Date();
        
        var transaction = {"playerId": playerId, "currencyTpe": currencyType, "quantity": quantity, "vGood": vGood, "date": purchasedDate};
         
        Spark.runtimeCollection("Player_Paid_Details").insert(transaction);
    }
    
    })()