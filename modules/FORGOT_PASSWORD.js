if(Spark.data.scriptData){ //Checking if there is any scriptData passed in, if not then carry on the authentication as normal
    
    Spark.getLog().debug("received scripData");
    
    var action = Spark.data.scriptData.action;

    
    if("passwordRecoveryRequest" === action){
        startRecovery(Spark.data.scriptData); //Start recovery sequence
        
    } else if ("resetPassword" === action){
        resetPassword(Spark.data.scriptData); //Start reset sequence
    }
    
    else
    {
        status = "invalid action"; // action variable isn't valid, check spelling or value
    }
    
    Spark.setScriptError("action", status); // set an error to prevent the AuthenticationRequest being processed
    
}