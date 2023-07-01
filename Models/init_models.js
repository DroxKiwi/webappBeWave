const fs = require('fs')
const pool = require('../Utils/db');

// Read the SQL file
const table_creation = fs.readFileSync('tables_creation.sql').toString()

// Execute the SQL commands in the database
pool.query(table_creation, (err, result) => {
    if (err) throw err
    else {
        console.log("models imported")
    }
})