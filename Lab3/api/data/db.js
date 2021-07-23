// URL at which MongoDB service is running
var url = "mongodb://localhost:27017";
console.log(url);
// A Client to MongoDB
var MongoClient = require('mongodb').MongoClient;
 
// Make a connection to MongoDB Service
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected to MongoDB!");
  db.close();
});