const path = require("path");
const express = require("express");
const DB = require('../database/mongoDB')
const bodyParser = require('body-parser');
const port = 2500;
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
//do we need the static file to come through here?
app.use(bodyParser.json())

console.log("im up and running!")


//get questions
//need to set up endpoints to refelct the param import
app.get('/api/qa/questions', (req, res) => {
  console.log('questions req: ' + JSON.stringify(req.query))
  //does not currently exist in the database, need to set up
  DB.getQuestions(req.query, (err, questions) => {
    console.log("questions callback: "+questions)
    console.log("questions callback erro: "+err)
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(200).send(questions)
    }
  })
})

//get answers
app.get('api/qa/questions/:questions_id/answers', (req, res) => {
  console.log('answers req: ' + req)
  //does not currently exist in the database, need to set up
  DB.getAnswers(req.query, (err, answers) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(200).send(answers)
    }
  })
})

//post question
app.post('api/qa/questions', (req, res) => {
  console.log('question post req: ' + req)
  //does not currently exist in the database, need to set up
  //is req.query apropriate?
  DB.postQuestion(req.query, (err, succes) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(201).send(succes)
    }
  })
})

//post question
app.post('api/qa/questions/:question_id/answers', (req, res) => {
  console.log('answer post req: ' + req)
  //does not currently exist in the database, need to set up
  //is req.query appropriate?
  DB.postQuestion(req.query, (err, succes) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(201).send(succes)
    }
  })
})

//these put requests might just be indicators of passing along the answers wiht the product ID to just upgrade the item directly.

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  console.log('questions put helpful req: ' + req)
  //does not currently exist in the database, need to set up
  //is req.query appropriate?
  DB.putQuestionHelpful(req.query, (err, succes) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(204).send(succes)
    }
  })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  console.log('questions put report req: ' + req)
  //does not currently exist in the database, need to set up
  //is req.query appropriate?
  DB.putQuestionReport(req.query, (err, succes) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(204).send(succes)
    }
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log('answers put helpful req: ' + req)
  //does not currently exist in the database, need to set up
  //is req.query appropriate?
  DB.putAnswerHelpful(req.query, (err, succes) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(204).send(succes)
    }
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log('answers put report req: ' + req)
  //does not currently exist in the database, need to set up
  //is req.query appropriate?
  DB.putAnswerReport(req.query, (err, succes) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(204).send(succes)
    }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})

/*i have to devise what paths the routes are going to take.

figure out how to recive the URL request from the server of the project thropugh tot ht eh current server, google server to server comunication?

well the first thing to figure out is what we need to do in order to pass thie information along.

we nee dto comunicate wiht the database, so we need to inport the database information into this filr.

if the route says post, it needs to take in certain things in order to tdo that. first thing is */