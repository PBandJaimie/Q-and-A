//ETL scripting to be entered in mongoshell for aggregateing photos into answers

//rename
db.photos.updateMany({}, {$rename: {'id':'photo_id'}})
db.answers_csv.updateMany({}, {$rename: {'id': 'answer_id'}})
db.answers_ordered.updateMany({}, {$rename: {'answers_id':'answer'}})

//insert csv as sorted array into two new collections
db.answers_ordered.insertMany(db.answers_csv.find({answer_id:{$gte:0,$lte:199999}}).sort({'answer_id':1}).allowDiskUse().toArray())
db.photos_ordered.insertMany(db.photos.find({photo_id_num:{$gte:0,$lte:299999}}).sort({'answer_id':1}).allowDiskUse().toArray())
// db.answers_ordered.insertMany(db.answers_csv.find().sort({'answer_id':1}).allowDiskUse().toArray())

//updates the answers db to us int instead of string
db.answers.updateMany({}, {"$set": {
  'id': parseInt($id)
}})

//will deal with questions later, currently placed in a questions DB as converted CSV files, will not be agregating together. may need to index it in order to have quick look up later on, will optimize in testing.

//index for photos sort
db.photos.createIndex({photo_id:1},{name:'query for photo_id'})

//index for answers_ordered and photos_ordered

db.photos_ordered.createIndex({answer_id:1},{name:'query for answer_id'})
db.answers_ordered.createIndex({answer_id:1},{name:'query for answer_id'})

db.answers_ordered.aggregate([{
    // $match: {answer_id:{$gte:0,$lte:1999}}
    $match: {
      $expr: {
        $gte: [{
          $toInt: "$answer_id"
        }, 4000000]},
      $expr: {
        $lte: [{
          $toInt: "$answer_id"
        }, 6999999]
      }}
},
  {$group: {_id: {
    answer_id: "$answer_id",
    question: "$question_id",
    body: "$body",
    date:"$date_written",
    answerer_name: "$answerer_name",
    answerer_email: "$answerer_email",
    reported: "$reported",
    helpfulness: "$helpful"
  }}},
{$lookup:{
    from: "photos_ordered",
    localField: "_id.answer_id",
    foreignField: "answer_id",
    as: "photos",
    pipeline: [
      {$project: {
        _id: 0,
        answer_id:0,
        }
      }]
    }
  },
  {
    $merge:'answers_merged'
  }], { "allowDiskUse" : true }).explain("executionStats")

/**------------------------------------------------------------ */


db.questions.aggregate([{
  // $match: {answer_id:{$gte:0,$lte:1999}}
  $match: {
    $expr: {
      $gte: [{
        $toInt: "$product_id"
      }, 0]},
    $expr: {
      $lte: [{
        $toInt: "$product_id"
      }, 3999999]
    }}
},
{$group: {_id: "$product_id",
questions: {$push: {
  question_id: "$id",
  body: "$body",
  date:"$date_written",
  asker_name: "$asker_name",
  asker_email: "$asker_email",
  reported: "$reported",
  helpfulness: "$helpful"
}}}},
{
  $merge:'questions_merged'
}], { "allowDiskUse" : true }).explain("executionStats")

//was using the following code to aggregate the photos togher, decided it was an unesecary step and to just pipline it directly wiht the answers.

// db.photos.aggregate([ {
//   $match: {
//     $expr: {
//       $gte: [{
//         $toInt: "$photo_id"
//       }, 200000]},
//     $expr: {
//       $lte: [{
//         $toInt: "$photo_id"
//       }, 999999]
//     }}
// },
//   {$group: {_id: "$answer_id",
//   answer_id:{$first:"$answer_id"},
//   photos: {$push: {
//      id: "$photo_id",
//      url: "$url"
//   }}}},
//   {
//     $merge:'photos_results'
//   }], { "allowDiskUse" : true })