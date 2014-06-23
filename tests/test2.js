var Higgle = require('../higgle.js');
var db = new Higgle();
db.createCollection("Books");
var esums = db.collection("Books");
esums.insert({
  'DOC': 1,
  'Principal': 'Blue',
  'Dean of Strapping': 'Newlyn Joseph',
  'IPs': [5234, 7432]
});
esums.insert({
  'DOC': 2,
  'Harry Potter': 'JK Rowling',
  'Swag': 'Newlyn Joseph'
});
esums.insert({
  'DOC': 3,
  'Principal': 'Blue',
  'Dean of Strapping': 'Newlyn Joseph',
  'IPs': [5234, 7432]
});

var queryresults = esums.find({ 'DOC': or([1, 3]) });
console.log("Matching documents");
console.log(queryresults);