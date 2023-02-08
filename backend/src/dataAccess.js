const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const dbName = "feedback"
const collectionName = "feedback"

// shamelessly stolen from MERN biblio lab page 106, or C:\LabFiles\biblio\data_access.js
module.exports.call = async function call(operation, parameters, callback) {
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db(dbName);
    // set the collection to use
    const collection = db.collection(collectionName);

    //Execute Operations
    // available operations: 
    // ['initfeedback'|'clearfeedbacks'|'findallfeedbacks'|'findfeedback'|'updatefeedback' ]
    switch (operation.toLowerCase()) {
        case 'initfeedbacks':
            const initialRecords = [
                // { "_id": "5dfb7b07cef0eaea7dedefc6", "isbn": "001", "price": 18, "title": "Moby Dick" },
                // { "_id": "5dfb7b3ccef0eaea7dedefd5", "isbn": "002", "price": 4.48, "title": "War and Peace" }
                { "_id" : ObjectId("63e3bf526deda6a1b3a67115"), "text" : "asdf asdf asdf", "employeeID" : 3, "managerID" : 4 },
                { "_id" : ObjectId("63e3bf526deda6a1b3a67116"), "text" : "asdf asdf asdf", "employeeID" : 1, "managerID" : 2 },
                { "_id" : ObjectId("63e3bf526deda6a1b3a67117"), "text" : "asdf asdf asdf", "employeeID" : 5, "managerID" : 6 }
            ];
            await collection.insertMany(initialRecords).then(
                (result)=>{ callback({ status: "feedback records have been initialized." })},
                (reason)=>{ callback({ status: "error initializing feedback records" }) }
            );
            break;

        case 'clearfeedbacks':
            await collection.deleteMany({}).then(
                (result)=>{ callback({ status: "feedback records have been removed." })},
                (reason)=>{ callback({ status: "error removing feedback records." }) }
            );
            break;

        case 'findallfeedbacks':
            const feedbacks = await collection.find({}).toArray();
            callback({ feedbacks: feedbacks });
            break;

        case 'findfeedback':
            const feedback = await collection.findOne({ isbn: parameters.isbn });
            callback({ feedback:feedback });
            break;

        case 'updatefeedback':
            await collection.updateOne(
                { isbn: parameters.feedback.isbn },
                {$set: parameters.feedback},
                {upsert: true});
            callback({ status: 'item updated:'+parameters.feedback.isbn });
            break;

        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    client.close();
    return 'call complete';
}