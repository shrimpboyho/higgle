(function() {

    Array.prototype.insert = function(element) {
        this.push(element);
    };
    Array.prototype.matchQuery = function(doc, query) {
        // Console log the query
        console.log('Query:');
        console.log(query);
        // Tokenize the query
        var queryKeys = Object.keys(query);
        var queryValues = [];
        var i;
        for (i = 0; i < queryKeys.length; i++) {
            queryValues.push(query[queryKeys[i]]);
        }
        // Tokenize the document
        var docKeys = Object.keys(doc);
        var docValues = [];
        for (i = 0; i < docKeys.length; i++) {
            docValues.push(doc[docKeys[i]]);
        }
        // Begin scanning the doc for matches
        var k;
        for (i = 0; i < docKeys.length; i++) {
            for (k = 0; k < queryKeys.length; k++) {
                if (docKeys[i] == queryKeys[k]) {
                    if (docValues[i] == queryValues[k]) {
                        return true;
                    }
                }
            }
        }
        return false;

    };
    Array.prototype.find = function(query, callback) {
        // handle returning any empty queries
        if (!query || JSON.stringify(query) === '{}') {
            return this;
        }
        // handle any real queries
        else {
            // this is the result array
            // it will be packed with matching json documents
            var result = [];

            // loop through each document in the collection
            var i;
            for (i = 0; i < this.length; i++) {
                // console log the current document we are testing
                console.log('Current document:');
                var currentDoc = this[i];
                console.log(currentDoc);
                if (result.matchQuery(currentDoc, query)) {
                    result.push(currentDoc);
                }
            }
            if (result.length !== 0) {
                if (callback) {
                    callback(result);
                } else {
                    return result;
                }

            } else {
                if (callback) {
                    callback(false);
                } else {
                    return result;
                }
            }
        }
    };

    this.Higgle = function Higgle() {
        this.collections = [];
    };
    Higgle.prototype.createCollection = function(name, callback) {
        this.collections.push([name, []]);
    };
    Higgle.prototype.collection = function(name, callback) {
        var i;
        for (i = 0; i < this.collections.length; i++) {
            if (name == this.collections[i][0]) {
                if (callback) {
                    callback(this.collections[i][1]);
                } else {
                    return this.collections[i][1];
                }
            }
        }
        if (callback) {
            callback(false);
        } else {
            return false;
        }
    };
    Higgle.prototype.close = function() {
        return true;
    };

})(this);

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
var queryresults = esums.find({
    'Principal': 'Blue'
});
console.log("Matching documents");
console.log(queryresults);