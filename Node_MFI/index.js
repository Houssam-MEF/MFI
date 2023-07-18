const express =  require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const xlsx = require('xlsx')

dotenv.config()

const app = express()
const secret = 'MFI'


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

const pool = mysql.createPool ({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1]

        jwt.verify(bearerToken, secret, (err, decoded) => {
            if (err) {
                res.status(403).json({msg:'Error JWT', err})
            } else {
                req.user = decoded
                next();
            }
        })
    } else {
        res.status(403).send("No Token Provided")
    }
}

async function login (res, username, password) {
    pool.query(`SELECT * FROM users WHERE username = ?`, [username], (err, result) => {
        if (err) {
            res.status(500).send("Error:500 app.js login()" + err)
        } else {
            if (result.length == 0) {
                res.json({msg:"User not Found"})
            } else {
                pool.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
                    if (err) {
                        res.status(500).send("Error: 500 login tanya" + err)
                    } else {
                        if (result.length === 0 ) {
                            res.json({msg:"Wrong Password"})
                        } else {
                            const user = {'username': username}
                            const token = jwt.sign({user}, secret, {expiresIn: '1h'})
                            res.json({token})
                        }
                    }
                })
            }
        }
    })
}

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    login(res, username, password)
})

// get all the data from table and its Route
function getAllData (res) {
    pool.query("SELECT * FROM head_counts", (err, result) => {
        if (err) {
            res.status(500).json({msg:"Error in getting all data, please try again later !"})
        } else {
            res.status(200).json(result)
        }
    })
}
// get all
app.get('',  (req, res) => {
    const user = req.user
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
                res.status(200).json(result)
            }
        }
    })
}
// get One
app.get(`/:id`,  (req, res) => {
    getOneData(res, req.params.id);
})


// Insert 
function insertOne (res, newData) {
    pool.query(`INSERT INTO head_counts SET ? `, [newData], (err, result) => {
        if (err) {
            res.status(500).json({msg:"Error Occured app.js line insertOne()",err})
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({msg:"Error 404 : Not Found "})
            } else {
                const response = {result, newData}
                res.status(200).json(response)
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
            res.status(500).json({msg:"Error Occured app.js line updateData()", err})
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({msg:"Error 404 : Not Found "})
            } else {
                const response = {result, updatedData}
                res.status(200).json(response)
            }
        }
    })
}
// update One
app.put(`/:id`,  (req, res) => {
    const updatedData = req.body;
    updateOne(res, req.params.id, updatedData);
})


//Delete from table + route
function deleteOne (res, id) {
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
app.delete(`/:id`,  (req, res) => {
    const updatedData = req.body;
    deleteOne(res, req.params.id, updatedData);
})


// Import an excel file to the database + Route
const importExcel = async (file) => {
    const workbook = xlsx.readFile(file)
    const worksheet = workbook.SheetNames[0]
    const data =  xlsx.utils.sheet_to_json(workbook.Sheets['Feuil1'])

    data.forEach((row) => {
        pool.query(`INSERT INTO head_counts (\`identifiant\`, \`matricule\`, \`highlight\`, \`statut\`, \`first_name\`, \`last_name\`, \`gender\`, \`cost_center\`, \`zone\`, \`workstation_type\`, \`line\`, \`group\`, \`contract_type\`, \`start_date\`, \`first_period\`, \`second_period\`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, Object.values(row), (err, res) => {
            if (err) {
                res.status(500).json({msg:'Error while importing, please try again later!'})
            } else {
                res.status(200).json({msg:'File imported successfully! '})
            }
        })
    })
}

app.post('/import-excel',  async (req, res) => {
    try {
        const file = req.body.file;
        await importExcel(file);
        res.status(200).send('File imported Successfully')
    } catch (err) {
        console.error("Error importing: ", err)
        res.status(500).json({msg:'Error importing: ', err})
    }
})


// Export the data from databasa to Excel + Route
async function export_ (res) {
    pool.query("SELECT * FROM head_counts", (err, results) => {
        if (err) throw err;
        var data = [['ID', 'identifiant', 'matricule', 'highlight', 'statut', 'first_name', 'last_name',
         'gender', 'cost_center', 'zone', 'workstation_type', 'line', 'group', 'contract_type', 'start_date',
          'first_period', 'second_period']];
        results.forEach( row => {
            console.log(row)
            data.push([row.ID, row.identifiant, row.matricule, row.highlight, row.statut, row.first_name,
                 row.last_name, row.gender, row.cost_center, row.zone, row.workstation_type, row.line, row.group,
                  row.start_date, row.first_period, row.second_period])
        })
        var worksheet = xlsx.utils.aoa_to_sheet(data)
        var workbook = xlsx.utils.book_new()
        const currentDate = new Date().toISOString().replace('T', '_' ).replace(/[-:.]/g, "-").slice(0, -5);
        const filename = `${currentDate}_Export.xlsx`;
        xlsx.utils.book_append_sheet(workbook, worksheet, "HeadCount")
        xlsx.writeFile(workbook, filename)
    })
}

app.post('/export-excel', verifyToken, async (req, res) => {
    try {
      const user = req.user;
      await export_(res);
      res.status(200).json({ msg: 'File exported successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error occurred while exporting, please try again later' });
    }
  });
  


app.listen(8080, ()=> {
    console.log("listening on 8080")
})