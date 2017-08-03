const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
	id: {type: Number, unique: true, dropDups: true}, //id number for the repo
	owner_id: Number, //username id from github
	username: String, //username from github owner.login
	name: String, //name from github
	url: String, //html_url in the results object
  views: Number
});



let Repo = mongoose.model('Repo', repoSchema);

let save = (dataFromGithub, callback) => {
  //if username doesn't exist
  //save model
  var inst = new Repo(dataFromGithub);
  
  Repo.find(dataFromGithub)
    .limit(25)
    .sort({views: -1})
    .then(modelInst => {
    	if (modelInst.length === 0) {
    	console.log('have not searched')
    		inst.save();
    	} else {
    		console.log('searched already');
    		callback(modelInst);
    	}
    });
  // 	, (err, modelInst) => {
  // 	if (modelInst.length === 0) {
  // 		console.log('bye', modelInst)
  // 	  inst.save();
  // 	  if (callback) {
  // 	    callback(inst);
  // 	  }
  // 	} else {
  //   	console.log('hi', modelInst);
  //   	if (callback) {
  //   	  callback(modelInst);
  //   	}
  //   }
  // })
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;