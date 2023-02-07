const mongodb = require("mongodb")

const url = 'mongodb://localhost:27017/swapi'
//const client = new MongoClient(url)
//const dbName = 'swapi'
let dbP 
// const filmCollection = db.collection("films")
// const planetCollection = db.collection("planets")

mongodb.MongoClient.connect(url, function(err, db) {
    if (!err) {
        dbP = db.db('swapi'); 
    }else{
      console.log("DB CONNECTION FAILED. Is database running?");
    }
});
module.exports.getPerson = function (id, callback){
    const personCollection = dbP.collection("people")
    console.log("getting person",id)
    personCollection.find({pk: +id})
    .toArray((err, person) => {
        if (!err) {
            console.log(person)
            callback(null, person);
        } else {
          callback("Failed to find person", undefined);
        }
    })
}
module.exports.getAllPeople = function (callback){
    const personCollection=dbP.collection("people")
    personCollection.find()
    .toArray((err, people)=>{
        if(!err){
            callback(null,people)
        }
        else{
            callback("Could not get people", undefined)
        }
    })
}




