const fs = require('fs')
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})


// Read the SQL file
const usersModel = fs.readFileSync('../Models/user.sql').toString()
const logsModel = fs.readFileSync('../Models/logs.sql').toString()

// Execute the SQL commands in the database
pool.query(usersModel, (err, result) => {
    if (err) throw err
    else {
        pool.query(logsModel, (err, result) => {
            if (err) throw err
        })
    }
})