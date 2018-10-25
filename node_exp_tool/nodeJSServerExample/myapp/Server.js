var app = require('express')();
var express = require('express');
var http = require('http').Server(app);


app.use('/public/images', express.static(__dirname +"/public/images") );
app.use('/public/javascripts', express.static(__dirname + "/public/javascripts"));
app.use('/public/stylesheets', express.static(__dirname + "/public/css"));



app.get('/', function(req, res){
  
   res.sendFile('C:/Users/embint/Desktop/Manoz/node_exp_tool/nodeJSServerExample/myapp/SensorGenerator.html');
});

   
http.listen(3000, function(){
    console.log('Listening on *: 3000');
})
