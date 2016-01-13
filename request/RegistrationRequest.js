"use strict";

(function(){
    var userEmail = Spark.data.scriptData.email;
    Spark.setScriptData("email", userEmail);
    })()