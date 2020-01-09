var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/stock_news");
var stockNewsSchema = new mongoose.Schema({
    tradingSymbol: String

});
var StockNews  = mongoose.model("StockNews", stockNewsSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addtradingnews", (req, res) => {
    console.log(req.body)
    var myData = new StockNews(req.body);
    myData.save()
        .then(item => {
            res.status(201).send("Name was created to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});