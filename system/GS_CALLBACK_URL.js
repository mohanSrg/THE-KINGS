//https://preview.gamesparks.net/callback/295372RJaZdd/bacAKTKlrsZ3akw3Led3Fl0gE29BjvqW/

(function(){
    var action = Spark.getData().action;
    
    if(action == "accountActivation")
    {
        require("VERIFY_ACCOUNT_ACTIVATION_CODE");
        var result = verifyAccountActivationCode();
        Spark.setScriptData("Activation Code", result.accountCode);
        Spark.setScriptData("Account_Activation_Status", result.status);
        
    }
    else if(action == "LogMatchResultDetails")
    {
        require("LOG_MATCH_RESULT_DETAILS");
        var response = logMatchResultDetails();
        
        
        require("UPDATE_TO_LEADERBOARD");
      //  updateToLeaderBoard();
        
        Spark.setScriptData("winnerWins", response.winnerWins);
        Spark.setScriptData("looserLosses", response.looserLosses);
        
 
    }


})()