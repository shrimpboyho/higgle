(function(){

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
                return this.collections[i];
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
console.log(db.collection("Books"));
