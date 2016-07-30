var express = require("express");
var app = express();
var mongo = require("mongodb").MongoClient;
var mongoURL = 'mongodb://localhost:27017/urlsDB';
var URLverifier = require("./public/src/URLverifier");

app.use(express.static('public'));

app.get('/:short_url', (req, res, next) => {
    var short_url = "https://little-url-calibay.c9users.io/" + req.params.short_url;

    if (req.url.match(/\/new|favicon/) != null) {
        next();
    } else {
        mongo.connect(mongoURL, (err, db) => {
            if (err) throw err;
            var collection = db.collection('urls');
            collection.find({short_url: short_url}).toArray((err, result) => {
                if (err) throw err;
                res.writeHead(301, {Location: result[0].orginal_url});
                res.end();
                db.close();
            });
        }); 
    }
});

app.get('/new/:url*?', (req, res) => {

    var url = req.params.url + req.params[0];
    var verifyURL = URLverifier.verify(url);
    var entry = 'hi';
    if (verifyURL.isValid) {
        mongo.connect(mongoURL, (err, db) => {
            if (err) throw err;
            var collection = db.collection('urls');
            entry = {
                orginal_url: url, 
                short_url: "https://little-url-calibay.c9users.io/" + 
                    Math.random().toString(16).substr(2,6)};
            res.send(entry);
            collection.insert(entry);
            res.end();
            db.close();
        });

    } else {
        res.send(verifyURL.message);
    }

}); 



app.listen(process.env.PORT);