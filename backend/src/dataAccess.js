const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const dbName = "feedback"

// shamelessly stolen from MERN biblio lab page 106, or C:\LabFiles\biblio\data_access.js
module.exports.call = async function call(operation, parameters, callback) {
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db(dbName);
    // set the collections to use
    const feedbackCollection = db.collection("feedback");
    const associationCollection = db.collection("associations"); // employees/managers. TODO: rename everywhere to workerCollection if DB is updated also?

    // Execute Operations
    // TODO: split switch-case into actual function module exports
    let feedbacks;
    switch (operation.toLowerCase()) {

        case 'getallemployees':
        employees = await associationCollection.find({}).toArray()
        callback({employees: employees})
            break;

        case 'initfeedbacks':
            const initialRecords = [
                // {"_id": "63e3bf526deda6a1b3a67115", "text": "asdf asdf qwerty", "employeeID": 3, "managerID": 4},
                // {"_id": "63e3bf526deda6a1b3a67116", "text": "qwerty asdf asdf", "employeeID": 1, "managerID": 2},
                // {"_id": "63e3bf526deda6a1b3a67117", "text": "asdf qwerty asdf", "employeeID": 5, "managerID": 6}
                {"text": "qwerty asdf asdf", "employeeID": 1, "managerID": 2},
                {"text": "asdf asdf qwerty", "employeeID": 3, "managerID": 4},
                {"text": "asdf qwerty asdf", "employeeID": 5, "managerID": 6}
            ];
            await feedbackCollection.insertMany(initialRecords).then(
                (result)=>{ callback({ status: "feedback records have been initialized." })},
                (reason)=>{ callback({ status: "error initializing feedback records" }) }
            );
            break;

        case 'clearfeedbacks':
            await feedbackCollection.deleteMany({}).then(
                (result)=>{ callback({ status: "feedback records have been removed." })},
                (reason)=>{ callback({ status: "error removing feedback records." }) }
            );
            break;

        case 'findallfeedbacks':
            feedbacks = await feedbackCollection.find({}).toArray();
            callback({ feedbacks: feedbacks });
            break;

        // new. Not certain of associations collection layout, so "id" may be replaced with "_id" or similar tag. Also not certain if employee types will go in separate collections
        case 'findworker':
            const worker = await associationCollection.findOne({"_id": parameters.workerID})
            callback({worker: worker})
            break;

        case 'newemployee':
            associationCollection.insert({"_id": parameters.employeeID, "managerID": parameters.managerID})
            break;

        case 'findmanagerfeedback':
            feedbacks = await feedbackCollection.find({ managerID: parameters.managerID });
            callback({ feedbacks: feedbacks });
            break;

        case 'findemployeefeedback':
            feedbacks = await feedbackCollection.find({ employeeID: parameters.employeeID });
            callback({ feedbacks: feedbacks });
            break;

        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    client.close();
    return 'call complete';
}