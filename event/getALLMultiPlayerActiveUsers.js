var collection = Spark.runtimeCollection("MatchDetails");
   var today = today();
    var week = weekly();
    var month = monthly();


   function today(){
        var start = new Date();    
        start.setHours(0,0,0,0);
        
        var end = new Date();
        end.setHours(23,59,59,999);
        
        var result = collection.find({"matchStartTime":{ "$gte":Date.parse(start),"$lte":Date.parse(end)}},{"contestants.player1.id":1,"contestants.player2.id":1});   
        
        var playersArray = new Array();
        
        var i = 0;
        while(result.hasNext()){
            if( i == 0){
                    var data = result.next();
                    playersArray.push(data.contestants.player1.id);
                    playersArray.push(data.contestants.player2.id);    
            }else{
                var temp = 0;
                var data = result.next();
                for(j = 0; j < playersArray.length; j++){
                    if(playersArray[j] == data.contestants.player1.id){
                        temp++;
                        break;
                    }
                }
                if(temp == 0){
                    playersArray.push(data.contestants.player1.id);
                }
                temp = 0;
                for(j = 0; j < playersArray.length; j++){
                    if(playersArray[j] == data.contestants.player2.id){
                        temp++;
                        break;
                    }
                }
                if(temp == 0){
                    playersArray.push(data.contestants.player1.id);
                }
            }
            i++;
        }
        
        return playersArray.length;
   }
   
   function weekly()
   {
       var start = new Date(); 
        start.setDate(start.getDate()-6);
        start.setHours(0,0,0,0);
        
        var end = new Date();
        end.setHours(23,59,59,999);
        
       return collection.find({"matchStartTime": {"$gte" : start, "$lt": end}},{"contestants.player1.id":1,"contestants.player2.id":1});     
        //return start;
   }
   
   function monthly()
   {
       
        var start = new Date(); 
        start.setDate(start.getDate()-30);
        start.setHours(0,0,0,0);
        
        var end = new Date();
        end.setHours(23,59,59,999);
        
        return collection.find({"matchStartTime": {"$gte" : start, "$lt": end}},{"contestants.player1.id":1,"contestants.player2.id":1});     
       //return start;
   }

    Spark.setScriptData("today active users", today);
    Spark.setScriptData("last week active users", week);
    Spark.setScriptData("last month active users", month);