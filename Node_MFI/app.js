const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')
const jwt  = require('jsonwebtoken')
const exceljs = require('exceljs')


// to read from .env file
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.options('/login', cors())
// app.use(express.json())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
  });


// Identifying host, user, password, database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

// Creating Connection With Database
pool.getConnection( (err) => { 
    if (err) throw err
    console.log("Connected")
})

async function importDataFromExcel () {
    try {
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile('../Files/HeadCount.xlsx')

        const worksheet = workbook.getWorksheet(1)

        await Promise.all (
            worksheet.eachRow(2).map(async (row) => {
                const [col1, col2, col3] = row.values;
                const query = `INSERT INTO head_counts Values (?, ?, ?)`;
                await pool.execute(query, [col1, col2, col3]);
            })
        )


        

        console.log("Data Imported Successfully")
    } catch (err) {
        console.error("Excel error : " + err)
    } finally {
        if (pool) {
            pool.releaseConnection();
        }
        pool.end();
    }
}

importDataFromExcel()

let secret = "MFI"
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) {
            res.status(500).send("Error:500 app.js login()" + err)
        } else {
            if (result.length === 0) {
                res.json("User not Found")
            } else {
                pool.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
                    if (err) {
                        res.status(500).send("Error: 500 login tanya" + err)
                    } else {
                        if (result.length === 0 ) {
                            res.json("Wrong Password")
                        } else {
                            const user = {'username': username}
                            const token = jwt.sign({user}, secret)
                            res.json({token})
                        }
                    }
                })
            }
        }
    })
})

app.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, secret, (err, data) => {
        if (err) {
            res.status(403).send("Error JWT")
        }
        res.json({
            'msg':'Post Created',
            data
        })
    })
})

function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1]
        req.token = token

        next()
    } else {
        res.status(403)
    }
}

// get all the data from table and its Route
function getAllData (res) {
    pool.query("SELECT * FROM head_counts", (err, result) => {
        if (err) {
            res.status(500).send("Error Occured app.js getAllData() ")
        } else {
            res.send(result)
        }
    })
}
// get all
app.get('', (req, res) => {
    getAllData(res);
})


// get one Person from table + Route
function getOneData (res, id) {
    pool.query(`SELECT * FROM head_counts WHERE ID = ?`, [id], (err, result) => {
        if (err) {
            res.status(500).send("Error Occured app.js line getOneData()")
        } else {
            if (result.length === 0){
                res.status(404).send("Not Found")
            } else {
                res.send(result)
            }
        }
    })
}
// get One
app.get(`/:id`, (req, res) => {
    getOneData(res, req.params.id);
})


// Insert 
function insertOne (res, newData) {
    pool.query(`INSERT INTO head_counts SET ? `, [newData], (err, result) => {
        if (err) {
            res.status(500).send("Error Occured app.js line insertOne()"+ err)
        } else {
            if (result.affectedRows === 0) {
                res.status(404).send("Error 404 : Not Found ")
            } else {
                const response = {result, newData}
                res.send(response)
            }
        }
    })
}
// insert One
app.post(``, (req, res) => {
    const newData = req.body;
    insertOne(res, newData);
})


//update a row in table + Route
function updateOne (res, id, updatedData) {
    pool.query(`UPDATE head_counts SET ? WHERE ID = ?`, [updatedData, id], (err, result) => {
        if (err) {
            res.status(500).send("Error Occured app.js line updateData()"+ err)
        } else {
            if (result.affectedRows === 0) {
                res.status(404).send("Error 404 : Not Found ")
            } else {
                const response = {result, updatedData}
                res.send(response)
            }
        }
    })
}
// update One
app.put(`/:id`, (req, res) => {
    const updatedData = req.body;
    updateOne(res, req.params.id, updatedData);
})


//Delete from table + route
function deleteOne (res, id, updatedData) {
    pool.query(`DELETE FROM head_counts WHERE ID = ?`, [id], (err, result) => {
        if (err) {
            res.status(500).send("Error Occured app.js line updateData()"+ err)
        } else {
            if (result.affectedRows === 0) {
                res.status(404).send("Error 404 : Not Found ")
            } else {
                res.send(result)
            }
        }
    })
}
// Delete One
app.delete(`/:id`, (req, res) => {
    const updatedData = req.body;
    deleteOne(res, req.params.id, updatedData);
})
app.listen(8080, ()=> {
    console.log("listening on 8080")
})