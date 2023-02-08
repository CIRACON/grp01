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
    // [initfeedback | clearfeedbacks | findallfeedbacks | findmanagerfeedback | findemployeefeedback | updatefeedback]
    let feedbacks;
    switch (operation.toLowerCase()) {

        case 'updatefeedback':
            await collection.updateOne(
                { _id: parameters.feedback._id }, // TODO: no idea if this is correct, converted from biblio's isbn
                {$set: parameters.feedback},
                {upsert: true});
            callback({ status: 'item updated:'+parameters.feedback._id });
            break;

        case 'initfeedbacks':
            const initialRecords = [
                {"_id": "63e3bf526deda6a1b3a67115", "text": "asdf asdf asdf", "employeeID": 3, "managerID": 4},
                {"_id": "63e3bf526deda6a1b3a67116", "text": "asdf asdf asdf", "employeeID": 1, "managerID": 2},
                {"_id": "63e3bf526deda6a1b3a67117", "text": "asdf asdf asdf", "employeeID": 5, "managerID": 6}
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
            feedbacks = await collection.find({}).toArray();
            callback({ feedbacks: feedbacks });
            break;

        case 'findmanagerfeedback':
            feedbacks = await collection.find({ managerID: parameters.managerID });
            callback({ feedbacks: feedbacks });
            break;

        case 'findemployeefeedback':
            feedbacks = await collection.find({ employeeID: parameters.employeeID });
            callback({ feedbacks: feedbacks });
            break;

        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    client.close();
    return 'call complete';
}