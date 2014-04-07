var index = require('./routes/index');  //add  this  to  beginning  of  app.js
app.get('/', index.view);  //change  this route 

var models = require('../models');  

exports.view = function(req, res) {  
	//search  the  database  object  for  a  model.  
	models.Img.find({},  function(err, dbData){  
			data = {'images':dbData}  
			res.render('index', data);  
	});  
}



var express = require('express');  
var http = require('http');  
var handlebars = require('express3-handlebars');  
var app = express();  

//load  environment  variables  
var dotenv = require('dotenv');  
dotenv.load(); 

//Configures the Template engine  
app.engine('handlebars', handlebars());  
app.set('view engine', 'handlebars');  
app.set('views', __dirname + '/views');  

app.get('/', function  (req, res)  {  
		res.render('index');  
});  

app.set('port', process.env.PORT || 3000);  

http.createServer(app).listen(app.get('port'), function(){  
		console.log('Express server listening on port ' +  
app.get('port'));  
});  

//add  instagram api setup 
var ig = require('instagram-node-lib');  
ig.set('client_id', process.env.instagram_client_id);  
ig.set('client_secret', process.env.instagram_client_secret);

ig.tags.info({  
		name: 'sushi',  
		complete: function(data) {  
					console.log(data);  
		}  
});  

var path = require('path');  //add  this  in  the  top  dependencies  
app.use(express.static(path.join(__dirname, 'public')));  //add  this  after  app  obj.

app.get('/hashtag', function (req, res) {  
			res.render('hashtag');  
})

var hashtag = require('./routes/hashtag');  //add  this  in  the  top  dependencies  
app.post('/hashtag', hashtag.getHashtag);  //add  this  with  routes

app.use(express.bodyParser());  //add  this  right  before  rou

//database  setup  
var mongoose = require('mongoose');  
mongoose.connect(process.env.MONGOHQ_URL ||  'mongodb://localhost/instagramexample'); 

app.post('/save', hashtag.saveFavorites);

app.post('/delete', index.deleteImage); 

exports.deleteImage = function(req, res) {  
	models.Img.find({ _id: req.body.id }).remove().exec(); 
	res.redirect('/');  
}