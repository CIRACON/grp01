const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const db = client.db("feedback");
const feedbackCollection = db.collection("feedback");
const associationCollection = db.collection("associations"); // employees/managers. TODO: rename everywhere to workerCollection if DB is updated also?

module.exports.getEmployeeById = async function(id, callback) {
    callback({employee: await associationCollection.findOne({"id": +id})})
}

module.exports.getEmployeeFeedback = async function(id, callback) {
    callback({employeeFeedback: await feedbackCollection.find({'employeeID': +id}).toArray()})
}

module.exports.getManagerFeedback = async function(id, callback) {
    callback({managerFeedback: await feedbackCollection.find({ 'managerID': +id }).toArray()})
}

module.exports.getEmployeesOfManager = async function(id, callback) {
    callback({employeesOfManager: await associationCollection.find({ "managerID": +id }).toArray()})
}

module.exports.postFeedback = async function (requestBody, callback) {
    await feedbackCollection.insertOne({
        "text": requestBody.text,
        "employeeID": requestBody.employeeID,
        "managerID": requestBody.managerID
    }).then(
        (result) => { callback({ status: "feedback added" }) },
        (reason) => { callback({ status: "error when adding feedback" }) }
    )
}

// shamelessly stolen from MERN biblio lab page 106, or C:\LabFiles\biblio\data_access.js
module.exports.call = async function call(operation, parameters, callback) {
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db("feedback");
    // set the collections to use
    const feedbackCollection = db.collection("feedback");
    const associationCollection = db.collection("associations"); // employees/managers. TODO: rename everywhere to workerCollection if DB is updated also?

    // Execute Operations
    // TODO: split switch-case into actual function module exports
    let feedbacks;
    switch (operation.toLowerCase()) {

        case 'postfeedback':
            let feedback = parameters.feedback.text
            let employeeID = parameters.feedback.employeeID
            let managerID = parameters.feedback.managerID
            await feedbackCollection.insertOne({"text": feedback, "employeeID": employeeID, "managerID": managerID}).then(
                (result) => {callback({status: "feedback added"})},
                (reason) => {callback({status: "error when adding feedback"})}
            )
            break;

        case 'findallemployees':
        case 'employees':
            employees = await associationCollection.find({}).toArray()
            callback({employees: employees})
            break;

        case 'initemployees':
            const initialAssociations = [
                {
                    "id": 1,
                    "managerID": 2
                },
                {
                    "id": 2,
                    "managerID": null
                },
            ]
            await associationCollection.insertMany(initialAssociations).then(
                (result)=>{ callback({ status: "association records have been initialized." })},
                (reason)=>{ callback({ status: "error initializing association records" }) }
            );
            break;

        case 'initfeedbacks':
            const initialRecords = [
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

        case 'managerfeedback':
            //const managerFeedback = await feedbackCollection.findOne({'managerID': +parameters.id})
            const managerFeedback = await feedbackCollection.find({'managerID': +parameters.id}).toArray()
            callback({managerFeedback: managerFeedback})
            break;

        case 'findworker':
            const worker = await associationCollection.findOne({"id": +parameters.id})
            callback({worker: worker})
            break;

        case 'newemployee':
            await associationCollection.insertOne({"id": +parameters.id, "managerID": +parameters.managerID})
            break;

        case 'employeefeedback':
            const employeeFeedback = await feedbackCollection.find({'employeeID': +parameters.id}).toArray()
            callback({employeeFeedback: employeeFeedback})
            break;
        
        case 'employeesof':
            const employeesOfManager = await associationCollection.find({"managerID": +parameters.id}).toArray()
            callback({employeesOfManager: employeesOfManager})
            break;

        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    client.close();
    return 'call complete';
}