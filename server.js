const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))

mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology:true})

        
 .then(client=>{
     console.log('Connected to database')
     const db = client.db('RecipeDB')
     const RecipesCollection = db.collection('RecipesCollection')
     app.set('view engine','ejs')
     app.listen(3000,function(req,res){
        console.log('The server is running')
    })
    app.get('/', function(req,res){
        res.sendFile(__dirname+'/index.html')
    })
    app.set('views', __dirname + '/views');
    app.get('/recipes',function(req,res){
      db.collection('RecipesCollection').find().toArray()
        .then(result=>{
            console.log(result)
            res.render('recipes.ejs', {Recipe:result})
        })
        .catch(error=>{
            console.error(error)
        })
     })
    
    app.post('/recipes',function(req,res){
        RecipesCollection.insertOne(req.body)
        .then(result=>{ 
            res.redirect('/recipes')
        })


        .catch(error=>{
            console.error(error)
        })
    })
 })





