(function() {
    // Array wrapper
    function HiggleCollection() {
        Array.call(this, arguments);
    }
    HiggleCollection.prototype = [];
    HiggleCollection.prototype.each = function each(callback) {
        return this.forEach(callback);
    };
    HiggleCollection.prototype.clear = function() {
        while (this.length > 0) {
            this.pop();
        }
    };
    // Handles callback
    function checkCall(cb, arg) {
        if (cb)
            cb(arg);
        else
            return arg;
    }
    // Inserts a JSON document element into an array.
    HiggleCollection.prototype.insert = function(element) {
        this.push(element);
    };
    // An internal function used for finding the query matches within a collection
    HiggleCollection.prototype.matchQuery = function(doc, query) {
        // Tokenize the query
        var queryKeys = Object.keys(query),
            docKeys = Object.keys(doc),
            queryKeysNum = queryKeys.length,
            queryValues = [],
            docValues = [],
            buffer = [], // Set up the true collector
            k, i;

        for (i = 0; i < queryKeys.length; i++) {
            queryValues.push(query[queryKeys[i]]);
        }

        for (i = 0; i < docKeys.length; i++) {
            docValues.push(doc[docKeys[i]]);
        }
        // Begin scanning the doc for matches
        var len = docKeys.length;
        for (i = 0; i < len; i++) {
            for (k = 0; k < queryKeys.length; k++) {
                if (docKeys[i] == queryKeys[k]) {
                    var dvalue = docValues[i];
                    var qvalue = queryValues[k];
                    // if they are not of the same type and there are no higgle operators
                    if ((typeof dvalue !== typeof qvalue) && (qvalue.constructor.name !== "HiggleOp")) {
                        continue;
                    }
                    // if they are not of the same type and higgle operators are present
                    if ((typeof dvalue !== typeof qvalue) && (qvalue.constructor.name === "HiggleOp")) {
                        if (qvalue.type === 'less') {
                            // check if the value is actually less than
                            if (dvalue < qvalue.less) {
                                buffer.push(true);
                            }
                        }
                        if (qvalue.type === 'great') {
                            // check if the value is actually greater than
                            if (dvalue > qvalue.great) {
                                buffer.push(true);
                            }
                        }
                        if (qvalue.type === 'range') {
                            // check if the value is actually greater than
                            if ((dvalue > lower) && (dvalue < upper)) {
                                buffer.push(true);
                            }
                        }
                        if (qvalue.type === 'or') {
                            // check if the value matches one of the possibilities
                            var i;
                            for (i = 0; i < qvalue.possibilities.length; i++) {
                                if(qvalue.possibilities[i] === dvalue) {
                                    buffer.push(true);
                                    break;
                                }
                            }
                        }
                    } else {
                        // determine what the type is
                        var type = typeof qvalue;
                        // check if arrays
                        if (Array.isArray(qvalue)) {
                            if (JSON.stringify(qvalue) === JSON.stringify(dvalue)) {
                                buffer.push(true);
                            }
                        }
                        // check if json
                        else if (type === 'object') {
                            if (JSON.stringify(qvalue) === JSON.stringify(dvalue)) {
                                buffer.push(true);
                            }
                        }
                        // check if anything else
                        if (qvalue === dvalue) {
                            buffer.push(true);
                        }
                    }
                }
            }
        }
        if (buffer.length === queryKeysNum) {
            return true;
        } else {
            return false;
        }

    };
    // Returns the results of a query
    HiggleCollection.prototype.find = function(query, callback) {
        // handle returning any empty queries
        if (!query || JSON.stringify(query) === '{}') {
            return this;
        }
        // handle any real queries
        else {
            // this is the result array
            // it will be packed with matching json documents
            var result = new HiggleCollection();

            // loop through each document in the collection
            var i;
            for (i = 0; i < this.length; i++) {
                // setup the current document and see if it matches
                var currentDoc = this[i];
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
        var k = new HiggleCollection();
        this.collections.push([name, k]);
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
    // Closes the database
    Higgle.prototype.close = function() {
        return true;
    };
    // Dumps the database to a file
    Higgle.prototype.dump = function(name) {
        require('fs').writeFile(name, JSON.stringify(this.collections), function(err) {
            if (err) throw err;
        });
    };
    // Load a database from a file
    Higgle.prototype.load = function(name, cb) {
        require('fs').readFile(name, 'utf8', function(err, buffer) {
            if (err) throw err;
            var newone = new Higgle();
            newone.collections = JSON.parse(buffer);
            cb(newone);
        });
    };
    // Constructor for the Higgle operator object
    this.HiggleOp = function HiggleOp(type) {
        this.type = type;
    };
    // Methods for the higgle operator
    HiggleOp.prototype.setLess = function(less) {
        this.less = less;
    };
    HiggleOp.prototype.setGreat = function(great) {
        this.great = great;
    };
    HiggleOp.prototype.setRange = function(lower, upper) {
        this.lower = lower;
        this.upper = upper;
    };
    HiggleOp.prototype.setPossibleValues = function(values){
        this.possibilities = values;
    }
    // Create the global higgle operator functions
    this.less = function(num) {
        var op = new HiggleOp('less');
        op.setLess(num);
        return op;
    };
    this.great = function(num) {
        var op = new HiggleOp('great');
        op.setGreat(num);
        return op;
    };
    this.range = function(lower, upper) {
        var op = new HiggleOp('range');
        op.setRange(lower, upper);
        return op;
    };
    this.or = function(values) {
        var op = new HiggleOp('or');
        op.setPossibleValues(values);
        return op;
    };

})(this);

// Node.js exportss
if (typeof exports !== 'undefined') {
    module.exports = Higgle;
}
