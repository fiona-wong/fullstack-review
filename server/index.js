const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const saveRepo = require('../database/index.js');


let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded());

app.post('/repos', function (req, res) {

	getRepos.getReposByUsername(req.body.term, results => {

    results.forEach(repo => {
	    var userRepo = {
	    	id: repo.id,
	    	owner_id: repo.owner.id,
	    	username: repo.owner.login,
	    	name: repo.name,
	    	url: repo.html_url
	    }
	    //console.log(userRepo)
	    saveRepo.save(userRepo);
    })
  });
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});



app.get('/repos', function (req, res) {
  // saveRepo.save({url: '/github/'}, model => {
  // 	//console.log(model);
  // 	res.send(model);
  // })
  // Repo.find({username: req.body.term}, (err, modelInst) => {
  //   res.send(modelInst);
  // }
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

