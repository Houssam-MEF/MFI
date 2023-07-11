const express = require('express')
const bodyParser = require('body-parser')
const {pool, getAllData} = require('./database')
const morgan = require('morgan')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.status(500).send("Something Wrong")
    next()
})

app.get('/all', (req, res) => {
    const data = getAllData();
    res.send(data)
})

app.listen(8080, ()=> {
    console.log("listening on 8080")
})