const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');
//import { setA, a } from './global.ts/index.js';

const app = express();

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localstorage');

app.use(express.static(__dirname + '/dist/eezee-meals'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api);

//---------------------------------------------------------------------------
const stripe = require("stripe")("sk_test_51MovXCAkvyUBOBQoOGpE1VaOJrQt0gYKfPg4TEWosXO9NDxdcdTfTWIb2E2j1q45HmvfbTXmUnOT168zq6vZzBMQ00jxMfE4Er");

app.post('/cart', async(req, res) => {
    //var pr = localStorage.getItem('price');
    console.log("LS: " + localStorage.getItem('price') );
    var pr = localStorage.getItem('price');
    console.log("pr: " + pr);
    var numPr = Number(pr);
    numPr = numPr * 100;
    console.log("numPr: " + numPr);

    try {
        console.log("that first one: " + req);
        token = req.body.token
      const customer = stripe.customers
        .create({
          email: "email@gmail.com",
          source: token.id
        })
        .then((customer) => {
          console.log("server.js" + customer);
          return stripe.charges.create({
            amount: 2260,
            description: "Test Purchase using express and Node",
            currency: "CAD",
            customer: customer.id,
          });
        })
        .then((charge) => {
          console.log(charge);
            res.json({
              data:"success"
          })
        })
        .catch((err) => {
            res.json({
              data: "failure",
            });
        });
      return true;
    } catch (error) {
      return false;
    }
})


//---------------------------------------------------------------------------

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/eezee-meals/index.html'));});

app.listen(process.env.PORT || 8080);
