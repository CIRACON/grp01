const express = require('express')
const bodyParser = require('body-parser')
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

// update
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
    dao.call('updatefeedback', { feedback: req.body, manager: manager }, (result) => {
        if (result.status !== undefined) {
            res.send(result.status);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


app.listen(3001) // open port for page
