[higgle]() - A Tiny JavaScript Database System
======
[![Build Status](https://drone.io/github.com/shrimpboyho/higgle/status.png)](https://drone.io/github.com/shrimpboyho/higgle/latest)

So, yeah, it's not complete yet, but it can support simple queries and has an API similar to ```mongodb```.
```js
var db = new Higgle();
db.createCollection("Books");
var esums = db.collection("Books");
esums.insert({'DOC': 1,
              'Principal':'Blue',
              'Dean of Strapping':'Newlyn Joseph',
              'IPs':[5234, 7432]
             });
esums.insert({'DOC': 2,
              'Harry Potter':'JK Rowling',
              'Swag':'Newlyn Joseph'
             });
esums.insert({'DOC': 3,
              'Principal':'Blue',
              'Dean of Strapping':'Newlyn Joseph',
              'IPs':[5234, 7432]
             });
var queryresults = esums.find({'Principal':'Blue'});
console.log("Matching documents");
console.log(queryresults);
```
##How To Install
If you're working on the client side, just include the script ```higgle.js```. This will provide you with the ```Higgle``` object attached to the ```window``` object.
```html
<script src="higgle.js"></script>
<script src="your_code.js"></script>
```
On Node.js just require the module after installing it via NPM.

```bash
$ npm install higgle
```
```js
// On Node.js you must require the module in order to use the Higgle object
var Higgle = require('higgle');
```
##Documentation
###Creating a Database
Using ```Higgle``` is super simple. The ```Higgle``` object represents your entire database. You can create an instance of one as follows:
```js
var db = new Higgle();  // It is common convention to name your database object 'db'
```
###Creating a Collection
Within a database you can have one or more collections. Collections are a group of JSON documents. You can create a collection by calling the following method on your database object.
```js
db.createCollection("People");
```
All you must specify as an argument is a string which will be the name of the collection.
You can now grab a handle to the collection by calling the following method on your database object.
```js
var people = db.collection("People");
```
All you must specify as an argument is the name of the collection (the same name you used to create the collection). The variable ```people``` is a collection object which you can utilize to modify your database.
###Adding Data
Adding data is super simple. Just call the following method on the collection object and specify the JSON document you want to add to the collection.
```js
people.insert({'name': 'wiley',
               'age': 35
             });
people.insert({'name': 'smith',
               'age': 16
             });
```
The above code adds two JSON documents to the collection known as ```people```.
###Querying Data
####Simple Queries
Querying data is also super simple. Every query returns an array full of documents that matched the query. To perform a query call the following method on the collection object:
```js
// This query will find all documents in the collection known as
// 'people' that have the string 'wiley' paired with the key 'name'
var queryresults = people.find({'name':'wiley'});

// You can also query with multiple JSON keys
var queryresults = people.find({'name':'wiley',
                                'age': 13
                               });
```
The ```queryresults``` object is an array with all the JSON documents that matched the query.
####Conditional Queries
Say for example we want to know all the people who can legally drink. To perform such a query we would do the following:
```js
// Find all documents where the key of 'age' has a value greater than 21
var queryresults = people.find({ 'age': great(21) });
```
Similarly, if we want to find all the documents in which the key of ```age``` has a value that is less than 21 we could perform the following query:
```js
// Find all documents where the key of 'age' has a value less than 21
var queryresults = people.find({ 'age': less(21) });
```
Similarly, if we want to find documents with a key of ```age``` that takes on a certain range of values, we can do so:
```js
// Find all documents where the key of 'age' has a value greater than 6 but less than 24
var queryresults = people.find({ 'age': range(6, 24) });
```
