'use strict'
var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/")); // Needed since I am not separating front- and backend correctly

const apiKey = 'q9adqk50adgnh1ac9u72luyansno2cgae3lswjza';

//let baseUrl = 'http://localhost:3000/tradingsymbol';
var baseAPIURL = 'https://stocknewsapi.com/api/v1?';

//Database constants

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//create environment variable and use it here
mongoose.connect("mongodb://localhost:27017/stock_news");

var stockNewsSchema = new mongoose.Schema({
    news_url: String

});


var StockNews  = new mongoose.model("StockNews", stockNewsSchema);

console.log("app.js running")

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addtradingnews", (req, res) => {
    console.log(req.body);
    var myData = new StockNews(req.body);
    myData.save()
        .then(item => {
            res.status(201).send("Name was created to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.post("/tradingsymbol/:symbol", (req, res) => {
    let sym = req.params.symbol;
    //Insert API Call and DB Action here
    let apiURL = baseAPIURL + 'tickers=' + sym + '&' + 'items=50' + '&' + 'token=';
    console.log(sym);
    console.log(apiURL + apiKey);
    callApi(apiURL, apiKey)
        .then(response => {
            console.log(JSON.stringify(response.data[0].news_url));
      //      let myDataObject = response.data[0].news_url;
      //      let myData = new StockNews(myDataObject);
        //    myData.save();
            res.send(response);
        })
        .catch(error => console.error(error))

    //res.send(sym);
 //   let testData =   callApi(apiURL, apiKey);

});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

// process request from html

async function callApi(apiUrl, apiKey) {
    var requestUrl = apiUrl + apiKey;
    console.log('Request URL in callApI function:' + requestUrl);
    var response = await fetch(requestUrl, {
        method: 'GET'
    });
    return await response.json();
}