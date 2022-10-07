var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
// const { userInfo } = require('os');


//global variable for tweet data
var tweetinfo = []
var searchinfo = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data);

  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
 
  res.send({tweetinfo:tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  res.send({tweetinfo:tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send({searchinfo: searchinfo});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  // taking the front end inputs, assign given info to a new element in the tweetinfo
  // that info will need id, text, and date
  // after entering the info and being assigned in the back end, then it will be shown
  // will be shown after the "Get Tweets" button is pressed because a new element is added
  var createTweet = req.body.name;
  var idNew = req.body.id;
  var dateNew = new Date().toString();

  tweetinfo.push({
    id: idNew,
    text: createTweet,
    created_at: dateNew
  });
})

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  // "Search" button
  // Will need to get user input for the id and will look in tweetinfo
  // after being found, it will be added into the list of found inputs
  // for the "Recently Searched" button
  // Also have to assign a var so that it can be displayed to the user

  var id = req.body.id;
  var found = false;
  var searched
  //var searched =req.params.searched;
  
  tweetinfo.forEach(function(tweet){
    if(!found && tweet.id == id){
        searchinfo.push(tweet);
        searched = tweet;
    }
  });
  res.send(searched);
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
  // get name and screen name from user and change it accordingly
  var nm = req.params.nm;
  var newName = req.body.newName;
  
  var found = false;

  tweetinfo.forEach(function(tweet, index){
    if (!found && String(tweet.user.name) === nm){
      tweet.user.screen_name = newName;
    }
  });
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet based on given id
  var tweetid = req.params.tweetid;

  var found = false;
  
  tweetinfo.forEach(function(tweet, index){
    if(!found && Number(tweet.id) === Number(tweetid)){
      tweetinfo.splice(index, 1);
    }
  });
  // once the info is taken out of the global var, "Get Tweets" will have to be called again
  // so that it will show that the info was removed from the database
})


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});