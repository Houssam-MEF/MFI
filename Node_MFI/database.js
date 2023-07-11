const mysql = require('mysql2')

const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

pool.getConnection( function(err) {
    if (err) throw err
    console.log("Connected")
})

function getAllData () {
    pool.query("SELECT * FROM head_counts", (err, result) => {
        if (err) throw err
        console.log(result)
    })
}