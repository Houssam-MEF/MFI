const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
  });
  
app.listen(8080, ()=> {
    console.log("listening on 8080")
})

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

pool.getConnection( (err) => { 
    if (err) throw err
    console.log("Connected")
})

function getAllData (res) {
    pool.query("SELECT * FROM head_counts", (err, result) => {
        if (err) {
            res.status(500).send("Error Occured app.js line 22")
        } else {
            res.send(result)
        }
    })
}

app.get('/all', (req, res) => {
    getAllData(res);
})  