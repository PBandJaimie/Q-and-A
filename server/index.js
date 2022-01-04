const path = require("path");
const express = require("express");
const DB = require('../database/mongoDB')
const bodyParser = require('body-parser');
const port = 2500;
const app = express();

app.use(express.urlencoded({extended: true}))
//do we need the static file to come through here?
app.use(express.json())

console.log("im up and running!")
//get questions
//need to set up endpoints to refelct the param import
app.get('api/questions', (req, res) => {
  console.log('questions req: ' + req)
  //does not currently exist in the database, need to set up
  DB.getQuestions(req.query, (err, questions) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(200).send(questions)
    }
  })
})



/*i have to devise what paths the routes are going to take.

figur eout how to recive the URL request from the server of the project thropugh tot ht eh current server, google server to server comunication?

well the first thing to figure out is what we need to do in order to pass thie information along.

we nee dto comunicate wiht the database, so we need to inport the database information into this filr.

if the route says post, it needs to take in certain things in order to tdo that. first thing is


god, i dont know waht it is. i just dont want to focus or do anything. ive been like this for weeks now. ever since fec ended. i just cant get back in thr grove of things. and i dont know why im so disinterested. */