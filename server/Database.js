var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
var config=require("../config.json");
var dbObj;
// Connection URL
var url = config.db.client+'://'+config.db.connection.host+':'+config.db.connection.port+'/'+config.db.connection.database;
function Database(){}
   Database.prototype.connect = function () {
     MongoClient.connect(url,{
      useNewUrlParser: true
     }, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to MongoDB server");
  dbObj=db;
});
}
 Database.prototype.getTedData = function (callback) {
   // Get the documents collection
   var collection = dbObj.collection(config.db.connection.tedCollection);
   // Find some documents
   collection.find({}).limit(100).toArray(function(err, docs) {
     assert.equal(err, null);
     //callback(err,null);
    // console.log("Found the following records");
    // console.dir(docs);
     callback(null,docs);
   });
}

module.exports =  Database;
