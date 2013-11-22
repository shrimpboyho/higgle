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
esums.insert({
    'DOC': 5,
    'Package': {
        'lark': 69,
        'narc': 70
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

// Test simple JSON in JSON query values
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

// Test double JSON query values
var query = {
    'Principal': 'Blue',
    'Dean of Strapping': 'Newlyn Joseph'
};
console.log('Query:'.red);
console.log(query);
var queryresults = esums.find(query);
console.log("Matches:".green);
console.log(queryresults);

// Test depth JSON in JSON query values
var query = {
    'Package': {
        'lark': 69,
        'narc': 70
    }
};
console.log('Query:'.red);
console.log(query);
var queryresults = esums.find(query);
console.log("Matches:".green);
console.log(queryresults);

/* Begin testing of the operators
 *
 *   -> less
 *   -> great
 *   -> range
 */

db.createCollection("people");
var people = db.collection("people");

people.insert({
    'name': 'Ethan',
    'age': 4
});

people.insert({
    'name': 'Adrian',
    'age': 10
});

people.insert({
    'name': 'Dana',
    'age': 14
});

people.insert({
    'name': 'Melina',
    'age': 12
});

// Test the less operator
var query = {
    'age': less(21)
};
console.log('Query:'.red);
console.log(query);
var queryresults = people.find(query);
console.log("Matches:".green);
console.log(queryresults);

// Test the great operator
var query = {
    'age': great(21)
};
console.log('Query:'.red);
console.log(query);
var queryresults = people.find(query);
console.log("Matches:".green);
console.log(queryresults);