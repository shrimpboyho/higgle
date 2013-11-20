(function() {
    function checkCall(cb, arg) {
        if (cb)
            cb(arg);
        else
            return arg;
    }
    // Inserts a JSON document element into an array.
    Array.prototype.insert = function(element) {
        this.push(element);
    };
    // An internal function used for finding the query matches within a collection
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
                    var dvalue = docValues[i];
                    var qvalue = queryValues[k];
                    // if they are not of the same type skip checking them
                    if (typeof dvalue !== typeof qvalue) {
                        continue;
                    } else {
                        // determine what the type is
                        var type = typeof qvalue;
                        // check if arrays
                        if (Array.isArray(qvalue)) {
                            if (JSON.stringify(qvalue) === JSON.stringify(dvalue)) {
                                return true;
                            }
                        }
                        // check if json
                        else if (type === 'object') {
                            if (JSON.stringify(qvalue) === JSON.stringify(dvalue)) {
                                return true;
                            }
                        }
                        // check if anything else
                        if (qvalue === dvalue) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;

    };
    // Returns the results of a query
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
                return checkCall(callback, result);
            } else {
                return checkCall(callback, false);
            }
        }
    };
    // Constructor for the Higgle object
    this.Higgle = function Higgle() {
        // Represents all the collections within the database
        this.collections = [];
    };
    // Allows user to create a new collection
    Higgle.prototype.createCollection = function(name, callback) {
        this.collections.push([name, []]);
    };
    // Returns a collection if it exists.
    Higgle.prototype.collection = function(name, callback) {
        var i;
        for (i = 0; i < this.collections.length; i++) {
            if (name == this.collections[i][0]) {
                return checkCall(callback, this.collections[i][1]);
            }
        }
        return checkCall(callback, false);
    };
    Higgle.prototype.close = function() {
        return true;
    };

})(this);

// Node.js exportss
if (typeof exports) {
    module.exports = Higgle;
}
