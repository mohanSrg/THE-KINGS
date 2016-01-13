function sendRecoveryEmail(email, name , token){

        var myGrid = Spark.sendGrid("Username", "Password"); //Here we use sendGrid as an example because we have full integration with their services.
        
        myGrid.addTo( email , name ); //The email to send the message to and the name of the user
        
        myGrid.setFrom("Email", "Name"); //Here you'd leave your organisation or personal email
        
        myGrid.setSubject("Subject"); //The subject of your email
        
        myGrid.setText(token); // The body and message of your email, here we just send the token 
        
        myGrid.send(); //Finally send the email
    }