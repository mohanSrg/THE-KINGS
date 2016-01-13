(function(){
    
        var amount = Spark.getData().amount;
        var quantity = 0;
        
        
        //TO-DO after creting database structure for discounts, we have to get quantity values from DB
        quantity = amount * 5;
        Spark.getPlayer().credit3(quantity);
        
        var request = new SparkRequests.BuyVirtualGoodsRequest();
        request.currencyType = 3;
        request.quantity  = quantity;
        request.shortCode = "GEM";
        var response = request.Send();
        if(!response.error){
        
            var transaction = {"playerId": Spark.getPlayer().getPlayerId(), "quantity": quantity, "amount" : amount, "date": new Date()};
             
            Spark.runtimeCollection("RealMoney_Transactions").insert(transaction);    
        }
        
        Spark.setScriptData("response", response);
    
    })()