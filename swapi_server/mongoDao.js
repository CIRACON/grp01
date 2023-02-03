const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'swapi'
const db = client.db(dbName)
const filmCollection = db.collection("films")
const personCollection = db.collection("people")
const planetCollection = db.collection("planets")





