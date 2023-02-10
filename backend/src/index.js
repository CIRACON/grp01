const express = require('express')
const bodyParser = require('body-parser')
const cors=require('cors')
const app = express()
const dao = require("./dataAccess") // database access object

app.use(express.json()) // parse JSON body
app.use(cors())

app.get("/employee/:id", function(req, res) {
    if (req.params.id === undefined) {
        res.statusCode = 404
        res.end()
        return
    }
    dao.getEmployeeById(req.params.id, (result) => {
        res.send(result.employee)
    })
})

app.get("/employeefeedback/:id", function(req, res) {
    if (req.params.id === undefined) {
        res.statusCode = 404
        res.end()
        return
    }
    dao.getEmployeeFeedback(req.params.id, (result) => {
        res.send(result.employeeFeedback)
    })
})

app.get("/managerfeedback/:id", function(req, res) {
    if (req.params.id === undefined) {
        res.statusCode = 404
        res.end()
        return
    }
    dao.getManagerFeedback(req.params.id, (result) => {
        res.send(result.managerFeedback)
    })
})

app.get("/employeesof/:id", function(req, res) {
    if (req.params.id === undefined) {
        res.statusCode = 404
        res.end()
        return
    }
    dao.getEmployeesOfManager(req.params.id, (result => {
        res.send(result.employeesOfManager)
    }))
})

app.post("/feedback", (req, res) => {
    if (req.body === undefined) {
        res.statusCode = 500
        res.end()
        return
    }
    dao.postFeedback(req.body, (result) => {
        if (result.status === undefined) {
            res.statusCode = 500
            res.end()
            return
        }
        res.send(result.status)
    })
})

app.get("/initemployees", (req, res) => {
    dao.getInitEmployees(() => {
        res.send("init complete")
    })
})

app.get("/initfeedbacks", (req, res) => {
    dao.getInitFeedback(() => {
        res.send("init complete")
    })
})

// I know it's duplicate code, just leaving this in as a shim
app.get("/feedback", (req, res) => {
    dao.getFeedback((result) => {
        res.send(result.feedbacks)
    })
    // dao.call("findallfeedbacks", {}, (result) => {
    //     console.log(result.status)
    //     res.send(result.feedbacks)
    // })
})

app.get("/findallfeedbacks", (req, res) => {
        dao.getFeedback((result) => {
        res.send(result.feedbacks)
    })
})

app.get("/employees", (req, res) => {
    dao.getEmployees((result => {
        res.send(result.employees)
    }))
})

app.post("/newemployee", (req, res) => {
    if (req.body.id === undefined || req.body.managerID === undefined) {
        res.statusCode = 500
        res.end()
    }
    dao.getNewEmployee(req.body.id, req.body.managerID, (result) => {
        if (result.status === undefined) {
            res.statusCode = 500
            res.end()
            return
        }
        res.send(result.status)
    })
})

app.listen(3001) // open port for page
