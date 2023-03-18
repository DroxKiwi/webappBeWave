const fs = require('fs')
const { Pool } = require('pg')


// Verify information about database HERE !!!!
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})


// Read the SQL file
const usersModel = fs.readFileSync('user.sql').toString()
const betatestersModel = fs.readFileSync('betatesters.sql').toString()
const contactsModel = fs.readFileSync('contacts.sql').toString()
const logsModel = fs.readFileSync('logs.sql').toString()

// Execute the SQL commands in the database
pool.query(usersModel, (err, result) => {
    if (err) throw err
    else {
        console.log("usersModel imported")
        pool.query(betatestersModel, (err, result) => {
            if (err) throw err
            else {
                console.log("betatestersModel imported")
                pool.query(contactsModel, (err, result) => {
                    if (err) throw err
                    else {
                        console.log("contactsModel imported")
                        pool.query(logsModel, (err, result) => {
                            if (err) throw err
                            else {
                                console.log("logsModel imported")
                            }
                        })
                    }
                })
            }
        })
    }
})