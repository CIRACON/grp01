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
    personCollection.find({pk: +id})
    .toArray((err, person) => {
        if (!err) {
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
module.exports.getPlanet = function (id, callback){
    const planetCollection = dbP.collection("planets")
    planetCollection.find({pk: +id})
    .toArray((err, planet) => {
        if (!err) {
            callback(null, planet);
        } else {
          callback("Failed to find planet", undefined);
        }
    })
}
module.exports.getFilm = function (id, callback){
    const filmCollection = dbP.collection("films")
    filmCollection.find({pk: +id})
    .toArray((err, film) => {
        if (!err) {
            callback(null, film);
        } else {
          callback("Failed to find film", undefined);
        }
    })
}


