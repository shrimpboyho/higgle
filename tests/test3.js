var Higgle = require('../higgle.js');
var db = new Higgle();
db.createCollection("Stuff");
var esums = db.collection("Stuff");

esums.insert({
    'shelf':{
    	'num': 3,
    	'cat': 'jew'
    }
});
esums.insert({
    'shelf':{
    	'num': 3,
    	'cat': 'lark'
    }
});

esums.insert({
    'shelf':{
    	'num': 4,
    	'cat': 'jew'
    }
});

var queryresults = esums.find({ 'shelf': {'num': 3,'cat':'lark'} });
console.log("Matching documents");
console.log(queryresults);

