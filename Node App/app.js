// require mongoDB
// require expressJS
// require body-parser

var mongoDB = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017';
var dbName = 'myNotes';
var db;

var app = express()

mongoDB.connect(url, function(error, client){

    if(error)
    {
        console.log('Can\'t connect to the database');
        return;
    }

    db = client.db(dbName);
    
    app.get('/Notes', function(req, res){
        
        db.collection('notes').find({}).toArray().then(data => {
            res.send(data);
        });

    });

    app.post('/Notes', function(req, res){
        console.log(JSON.stringify(req.body));
        var note = {}
        note.title = req.body["title"]
        note.body = req.body["body"]
        
        db.collection('notes').insertOne(note, (data) => {
            return res.send(JSON.stringify(data));
        });
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000);



