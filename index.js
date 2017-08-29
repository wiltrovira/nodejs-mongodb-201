var mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/video';

mongoClient.connect(url, function(err, db) {

    assert.equal(null, err);
    console.log("conectado exitosamente al servidor");

    // Find some documents in our collection
    db.collection('movies').find({}).toArray(function(err, docs) {

        // Print the documents returned
        docs.forEach(function(doc) {
            console.log(doc.title);
        });

        // Close the DB
        db.close();
    });

    // Declare success
    console.log("Se llamó al método find()");
});
