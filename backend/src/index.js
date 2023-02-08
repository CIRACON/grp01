const express = require('express')
const app = express()
const dao = require("./dataAccess") // database access object

app.use(express.json()) // parse JSON body

app.get("/feedback/managers/:id", function(req, res) {
    let feedbackResults = dao.getManagerFeedback(req.params.id)
    if (feedbackResults === undefined) {
        res.statusCode = 404
        res.end()
    }
    else {
        res.send(feedbackResults)
    }
})