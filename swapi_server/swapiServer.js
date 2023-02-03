const {express}=require('express')
const dao=require('./mongoDao')

const app=express()
app.use(express.json())


app.get('/planets/:id',function (req,res){
    res.send("planet")
})