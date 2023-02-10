const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const db = client.db("feedback");
const feedbackCollection = db.collection("feedback");
const associationCollection = db.collection("associations"); // employees/managers. TODO: rename everywhere to workerCollection if DB is updated also?

module.exports.connectToServer = async function() {
    await client.connect() // connect to the server. Remember to close open connections later
}

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
        "managerID": requestBody.managerID,
        "sender": requestBody.sender
    }).then(
        (result) => { callback({ status: "feedback added" }) },
        (reason) => { callback({ status: "error when adding feedback" }) }
    )
}

module.exports.getInitEmployees = async function (callback) {
    //connectAndRunThenDisconnect()
    await client.connect()
    const initialAssociations = [
        {"id": 1, "managerID": 2},
        {"id": 2, "managerID": null}
    ]
    await associationCollection.insertMany(initialAssociations).then(
        (result) => { callback({ status: "association records have been initialized."})},
        (reason) => { callback({ status: "error initializing association records"})}
    );
    await client.close()
}

module.exports.getInitFeedback = async function (callback) {
    const initialRecords = [
        { "text": "qwerty asdf asdf", "employeeID": 1, "managerID": 2, "sender": 1},
        { "text": "asdf asdf qwerty", "employeeID": 3, "managerID": 4, "sender": 3},
        { "text": "asdf qwerty asdf", "employeeID": 5, "managerID": 6, "sender": 5}
    ];
    await feedbackCollection.insertMany(initialRecords).then(
        (result) => { callback({ status: "feedback records have been initialized."})},
        (reason) => { callback({ status: "error initializing feedback records"})}
    );
}

module.exports.getFeedback = async function(callback) {
    callback({feedbacks: await feedbackCollection.find({}).toArray()});
}
module.exports.getEmployees = async function (callback) {
    callback({employees: await associationCollection.find({}).toArray()})
}

module.exports.postNewEmployee = async function(id, managerID, callback) {
    await associationCollection.insertOne({
        "id": +id, 
        "managerID": +managerID
    }).then(
        (result) => { callback({ status: "feedback added" }) },
        (reason) => { callback({ status: "error when adding feedback" }) }
    )

}