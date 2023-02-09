const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dao = require("./dataAccess") // database access object

app.use(express.json()) // parse JSON body

app.get('/:employeeType/:id', function(req, res) {
    if (req.params.employeeType !== 'manager' || req.params.employeeType !== 'employee') {
        res.statusCode = 404
        res.end()
        return
    }
    let feedbackResults = dao.call('findfeedback', {"workerID": req.params.id})
})

// TODO: replace with POST to submit new feedback, PUT modifies existing feedback post
app.post("/feedback", (req, res) => {
    if (req.body === undefined) {
        res.statusCode = 500;
        res.end();
        return;
    }
    // make call to db
    dao.call('postfeedback', {feedback: req.body}, (result) => {
        if (result.status !== undefined) {
            res.send(result.status);
        } else {
            res.statusCode = 500;
            res.end();
        }
    });
});

app.get("/initemployees", (req, res) => {
    dao.call("initemployees", {}, (result) => {
        console.log(result.status)
        res.send("init complete")
    })
})

app.get("/findallfeedbacks", (req, res) => {
    dao.call("findallfeedbacks", {}, (result) => {
        console.log(result.status)
        res.send(result.feedbacks)
    })
})

app.get("/initfeedbacks", (req, res) => {
    dao.call("initfeedbacks", {}, (result) => {
        console.log(result.status)
        res.send("init complete")
    })
})

app.get("/employees", (req, res) => {
    dao.call("employees", {}, (result) => {
        if (result.employees !== undefined) {
            res.send(result.employees)
        }
        else {
            res.statusCode = 404
            res.end()
        }
    })
})

app.post("/newemployee", (req, res) => {
    if (req.body.id === undefined || req.body.managerID === undefined) {
        res.statusCode = 500
        res.end()
    }
    else {
        dao.call('newemployee', {"id": req.body.id, "managerID": req.body.managerID}, (result) => {
            if (result.status !== undefined) {
                res.send(result.status)
            }
            else {
                res.statusCode = 500
                res.end()
            }
        })
    }
})

app.listen(3001) // open port for page
