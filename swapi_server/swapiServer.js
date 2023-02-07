const express=require('express')
const cors=require('cors')
const dao=require('./mongoDao')
const app=express()
app.use(express.json())
app.use(cors())
app.get('/person/:id',function (req,res){
    dao.getPerson(req.params.id, (err, person) => {
        if (person) {
          console.log("swapi.js GET single person: " + person);
          res.send(person);
        } else {
          res.statusCode = 404;
          res.end();
        }
      });
})
app.get('/people', function (req,res){
    dao.getAllPeople((err, people)=>{
        if (people){
            res.send(people)
        }
        else{
            res.statusCode = 404
            res.end()
        }
    })
})
app.get('/planet/:id', function(req, res){
    dao.getPlanet(req.params.id, (err, planet)=>{
        if(!err){
            res.send(planet)
        }else{
            res.statusCode=404
            res.end()
        }
    })
})
app.get('/film/:id', function(req, res){
    dao.getFilm(req.params.id, (err, film)=>{
        if(!err){
            res.send(film)
        }else{
            res.statusCode=404
            res.end()
        }
    })
})
app.listen(4000)