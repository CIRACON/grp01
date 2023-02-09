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

app.post("/feedback/:manager", (req, res) => {
    if (req.params.manager === undefined) {
        ;
    }
})

// // TODO: clobbered by '/:employeeType/:id', unnecessary (can delete)
// app.get("/feedback/managers/:id", function(req, res) {
//     let feedbackResults = dao.getManagerFeedback(req.params.id)
//     if (feedbackResults === undefined) {
//         res.statusCode = 404
//         res.end()
//     }
//     else {
//         res.send(feedbackResults)
//     }
// })

// TODO: replace with POST to submit new feedback, PUT modifies existing feedback post
app.put("/feedback/:manager", (req, res) => {
    if (req.params.manager === undefined || req.body === undefined) {
        res.statusCode = 500;
        res.end();
        return;
    }
    // use manager from path if available
    let manager = req.params.manager;
    if (manager != undefined) {
        req.body.manager = manager;
    }
    // make call to db
    dao.call('updatefeedback', {feedback: req.body, manager: manager}, (result) => {
        if (result.status !== undefined) {
            res.send(result.status);
        } else {
            res.statusCode = 404;
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
