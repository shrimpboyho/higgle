var Higgle = require('../higgle.js');
var colors = require('colors');

var db = new Higgle();
db.createCollection("esums");
var esums = db.collection("esums");
esums.insert({
    'DOC': 1,
    'Principal': 'Blue',
    'Dean of Strapping': 'Newlyn Joseph',
    'IPs': [5234, 7432]
});
esums.insert({
    'DOC': 2,
    'Harry Potter': 'JK Rowling',
    'Swag': 'Newlyn Joseph',
    'IPs': [5234, 7432]
});
esums.insert({
    'DOC': 3,
    'Principal': 'Blue',
    'Dean of Strapping': 'Newlyn Joseph',
    'Package': 'Blue'
});
esums.insert({
    'DOC': 4,
    'Package': {
        'lark': 69
    },
    'Dean of Strapping': 'Newlyn Joseph'
});

// Test simple string value
var query = {
    'Principal': 'Blue'
};
console.log('Query:'.red);
console.log(query);
var queryresults = esums.find(query);
console.log("Matches:".green);
console.log(queryresults);

// Test simple array value
var query = {
    'IPs': [5234, 7432]
};
console.log('Query:'.red);
console.log(query);
var queryresults = esums.find(query);
console.log("Matches:".green);
console.log(queryresults);

// Test simple JSON values
var query = {
    'Package': {
        'lark': 69
    }
};
console.log('Query:'.red);
console.log(query);
var queryresults = esums.find(query);
console.log("Matches:".green);
console.log(queryresults);