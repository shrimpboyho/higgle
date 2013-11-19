[higgle]() - A Simple Database in JavaScript
======

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
