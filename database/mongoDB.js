const mongoose = require('mongoose');

main().catch (err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Q&A');

  const questionSchema = new mongoose.Schema({
    "_id": String,
    "questions": [{
      "id": Number,
      "body": String,
      "date_written": Date,
      "asker_name": String,
      "asker_email": String,
      "helpfulness": Number,
      "reported": Boolean,
    }]
  })

  const answerSchema = new mongoose.Schema({
    "question_id": Number,
    "answers": [{
      "id": Number,
      "body": String,
      "date": Date,
      "answerer_name": Number,
      "answerer_email": String,
      "helpfulness": Boolean,
      "photos": [String]
    }]
  })

  const photosSchema = new mongoose.Schema({
    "answer_id": Number,
    "photos": [{
      "id": Number,
      "url": String
    }]
  })

const Question = mongoose.model('Question', questionSchema, 'questions_merged');

const Answer = mongoose.model('answer', answerSchema, 'answers_merged');

const Photos = mongoose.model('photos', photosSchema);


  let getQuestions = (data, callback) => {
    console.log('data: ' + JSON.stringify({'_id': data.product_id}));
    Question.find({'_id': data.product_id}, callback)
    //Question.find({}, callback).limit(5);

  }


  let getAnswers = (data) => {

    return Answers_ordered.find
  }


  module.exports.getQuestions = getQuestions;
}

  // const photoResultsSchema = new mongoose.Schema({
  //   "answer_id": Number,
  //   "photos": [{
  //     "id": Number,
  //     "url": String
  //   }]
  // })

//const PhotosResults = mongoose.model('photos_results', photoResultsSchema);

//so we need to create the database querries

//we we need to have a queery for a read all for the database so that we can return all the questions for a single product ID.


//this is a general template, need to see how the data is being passed through for a read all.

/*
   so oice: input is the data, which should come in a requests witht he product id. output is an array of question object for the product ID. so we need to have the mongoDB searchby ID, then it will form it in a current schema, then it will return the data. then we test to see if it returns any data. we can also do a spoofing test for jest here.

   we need to include a few things.

   it sends along the product ID, but it doesnt specifiy how to organize the questions. probably in terms of date? i know that there is a way it is sorted in the front end, but i dont think it send it back in a specific way. so it would take in number of pages, and count if that where to change.

   the interesting thing is that im not sure how to use pages in this.


   */

   //how can we do this in a way in which the data comes into the databases, is transfromed into a single databse of complete objects/documents, and as more questions and answer are added to the database it adds them in directly to the main database.

  //write a function to read in the photos CSV and for each line of CSV insert it into the answers database.

  //ok, so what do we want this function to look like? we have to take in the photos and the answers CSV and merge them. it seems like the way im doing it just take

  //may need to fix the schemas that are currently here, we have one for questions, one for photos, one for answers, dont really need photos results though.