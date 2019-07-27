//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});



app.post('/',function(req,res){

   var firstName = req.body.fname;
   var lastName = req.body.lname;
   var email = req.body.email;


var data={
  members:[
    {
        email_address : email,
        status: "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME:  lastName,
        }
    }
  ]
};

var jsonData = JSON.stringify(data);

var options = {
  url : "https://us3.api.mailchimp.com/3.0/lists/93d2cfb5ff",
  method : "POST",
  headers : {
    "Authorization" : "rajatis1999 3f161e9fc19a0f1a1dba81e47ef21698-us3"
  },
  body: jsonData
};

request(options,function(error,response,body){
  if(error){
    res.sendFile(__dirname + '/failure.html');
  }
  else {
    if(response.statusCode==200)
      res.sendFile(__dirname + '/success.html');
    else {
      res.sendFile(__dirname + '/failure.html');
    }
  }
});

app.post('/failure',function(req,res){
  res.redirect('/');
});

});

app.listen(process.env.port || 3000,function(){
  console.log("Server is running on port 3000");
});


// API KEY
// 3f161e9fc19a0f1a1dba81e47ef21698-us3

// List id
// 93d2cfb5ff
