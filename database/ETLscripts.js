// what this does
// drops test collections if they exist
// repopulates test collections with raw data (batch if needed)
// in reviews, renames 'id' to 'review_id'
// both dbs, adds indexes to 'review_id'
// merge photos into reviews and save in new collection

//all of these work with the mongo shell, could most likely replicate this in compas, but lets get this running first.

//drop collections for testing


//aggregate photos

//rename
db.photos.updateMany({}, {$rename: {'id':'photo_id'}})
db.answers_csv.updateMany({}, {$rename: {'id': 'answer_id'}})

db.answers_ordered.insertMany(db.answers_csv.find({answer_id:{$gte:0,$lte:199999}}).sort({'answer_id':1}).allowDiskUse().toArray())

db.photos_ordered.insertMany(db.photos.find({photo_id_num:{$gte:0,$lte:299999}}).sort({'answer_id':1}).allowDiskUse().toArray())


// db.answers_ordered.insertMany(db.answers_csv.find().sort({'answer_id':1}).allowDiskUse().toArray())

db.answers_ordered.updateMany({}, {$rename: {'answers_id':'answer'}})

//updates the answers db to us int instead of string
db.answers.updateMany({}, {"$set": {
  'id': parseInt($id)
}})

//deal with questions later


//index for photos sort
db.photos.createIndex({photo_id:1},{name:'query for photo_id'})

//so do we need to create indexs before we enact the look up process? probably, given that its an array now though it should be ordered so we can limit it. they all have answer id so maybe we can just match them up directly.

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
    //these ID might be a problem, especially if i mess with them beforehand
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

  //pipeline maybe needs to be last before merge and also include grouping
  //   { $match: {
    //     $expr:
    //       { $and:
    //         [
    //         { $eq: ["_id", "answer_id"] },
    //         { $lte: ["_id", 99]}
    //         ]
    //       }
    //     }
    // },

/**------------------------------------------------------------ */


db.photos.aggregate([ {
  $match: {
    $expr: {
      $gte: [{
        $toInt: "$photo_id"
      }, 200000]},
    $expr: {
      $lte: [{
        $toInt: "$photo_id"
      }, 999999]
    }}
},
  {$group: {_id: "$answer_id",
  answer_id:{$first:"$answer_id"},
  photos: {$push: {
     id: "$photo_id",
     url: "$url"
  }}}},
  {
    $merge:'photos_results'
  }], { "allowDiskUse" : true })


  //so how do we want to he answers to look

  //well we want them to be similair to the set up we have for merging the photos
  //so we need to rename the id in teh answers as well, we need to create an index for the answers, then we need to merge them.


