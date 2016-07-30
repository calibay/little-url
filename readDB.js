var mongo = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/urls';

mongo.connect(url, (err, db) => {
    if (err) throw err;
    var collection = db.collection('urls');
    collection.insert({orginal: "hi", shortened: Math.random().toString(16).substr(2,6)});

    var results = collection.find().toArray((err, r) => {
        if (err) throw err;
        for (var i = 0; i < r.length; i++ ) {
            console.log(r[i]);
        }
    });

    db.close();
});