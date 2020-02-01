'use strict'


//Database constants

// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// create environment variable and use it here
// mongoose.connect("mongodb://localhost:27017/stock_news_urls");

//var stockNewsSchema = new mongoose.Schema({
//    news_url: String
//});

//var StockNewsURLS = mongoose.model("StockNews", stockNewsSchema);

var baseAppURL = 'http://localhost:3000/tradingsymbol';

function sendRequest() {

    console.log("in sendRequest() function");
    let tradingsymbol = document.getElementById('tradingsymbol').value;
    console.log(tradingsymbol);
    let tradingSymbolEndpoint = makeRequest(tradingsymbol);
    console.log('Tradinsymbolendpoint: ' + tradingSymbolEndpoint);
    console.log("Reponse LOG:");
    callEndpoint(tradingSymbolEndpoint)
        .then(response => {
            // let news_url = response.data[0].news_url;
            //  console.log(news_url);
//            let ptag = document.createElement('p');
 //           ptag.innerHTML = JSON.stringify(response);

            let response_length = response.data.length;
            let i;
            for (i of response.data) {
                let newP = document.createElement('p');
                let news_url = i.news_url;
                let newTxtNode = document.createTextNode(news_url);
                newP.appendChild(newTxtNode);
                document.body.appendChild(newP);
                //console.log(i.news_url)
            }

          //  let newP = document.createElement('href');
         //   let news_url = response.data[0].news_url;
            //let newTxtNode = document.createTextNode(news_url);
        //    newP.appendChild(newTxtNode);
         //   document.body.appendChild(newP);
     //       let newDiv = document.createElement('div');
     //       let newContent = document.createTextNode("Hi was geht ab");

            //hinzufügen
     //       let currentDiv = document.getElementById("div1")
     //       document.body.insertBefore(newDiv, currentDiv);
        });
}

function makeRequest(tradingSymbol) {
    let tradingSymbolEndpoint = baseAppURL + '/' + tradingSymbol;
    //delete later
    console.log(tradingSymbolEndpoint);
    return tradingSymbolEndpoint;
}

async function callEndpoint(endpointUrl) {
    const response = await fetch(endpointUrl, {
        method: 'POST',
    });
    let data = await response.json();
    console.log(data);
    return data;
}