(function(){
    
    Array.prototype.insert = function(element){
        this.push(element);
    };
    Array.prototype.find = function(query){
        if(!query){
            return this;
        }
        else{
            var result = [];
            var i;
            for(i = 0; i < this.length; i++){
                if (JSON.stringify(query) === JSON.stringify(this[i])){
                    result.push(this[i]);
                }
            }
            if(result.length !== 0){
                return result;
            }
            else{
                return false;
            }
        }
    };
    window.Higgle = function Higgle() {
        this.collections = [];
    };
    Higgle.prototype.createCollection = function(name) {
        this.collections.push([name,[]]);
    };
    Higgle.prototype.collection = function(name) {
        var i;
        for(i = 0; i < this.collections.length; i++){
            if(name = this.collections[i][0]){
                return this.collections[i][1];
            }
        }
        return false;
    };
    Higgle.prototype.close = function() {
        return true;
    };

})();

var db = new Higgle();
db.createCollection("Books");
var books = db.collection("Books");
books.insert({'Harry Potter':'JK Rowling'});
books.insert({'Swag':'Newlyn Joseph'});
console.log(books.find({'Harry Potter':'JK Rowling'})[0]);
