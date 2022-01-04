const mongoose = require('mongoose');


main().catch (err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Q&A');

  const questionSchema = new mongoose.Schema({
    "product_id": Number,
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

  // const photoResultsSchema = new mongoose.Schema({
  //   "answer_id": Number,
  //   "photos": [{
  //     "id": Number,
  //     "url": String
  //   }]
  // })

  //how can we do this in a way in which the data comes into the databases, is transfromed into a single databse of complete objects/documents, and as more questions and answer are added to the database it adds them in directly to the main database.

  //write a function to read in the photos CSV and for each line of CSV insert it into the answers database.

  //ok, so what do we want this function to look like? we have to take in the photos and the answers CSV and merge them. it seems like the way im doing it just take

  //may need to fix the schemas that are currently here, we have one for questions, one for photos, one for answers, dont really need photos results though.

const Question = mongoose.model('question', questionSchema);

const Answer = mongoose.model('answer', answerSchema);

const Photos = mongoose.model('photos', photosSchema);

//const PhotosResults = mongoose.model('photos_results', photoResultsSchema);

}