var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
var config=require("../config.json");
var dbObj;
// Connection URL
var url = config.db.client+'://'+config.db.connection.host+':'+config.db.connection.port+'/'+config.db.connection.database;
function Database(){}
   Database.prototype.connect = function () {
     MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  dbObj=db;
});
}
 Database.prototype.getMatches = function (callback) {
   // Get the documents collection
   var collection = dbObj.collection(config.db.connection.matchCollection);
   // Find some documents
   collection.find({}).toArray(function(err, docs) {
     assert.equal(err, null);
     //callback(err,null);
    // console.log("Found the following records");
    // console.dir(docs);
     callback(null,docs);
   });
}
Database.prototype.getDeliveries = function (callback) {
  // Get the documents collection
  var collection = dbObj.collection(config.db.connection.deliveriesCollection);
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    //console.log("Found the following records");
    //console.dir(docs);
    callback(null,docs);
  });
}
module.exports =  Database;
