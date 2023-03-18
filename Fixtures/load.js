const { Pool } = require('pg');
const encryptPassword = require("../Utils/encryptPassword")


// Verify information about database HERE !!!!
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})

function fixtureLoad(){
    const password = "admin"
    const pseudo = "admin"
    const email = "admin@admin.com"
    const role = "ROLE_ADMIN"
    const {token, salt, hash} = encryptPassword(password)
    console.log("Fixture load -> creat : Admin user | pseudo : admin, password : admin")
    pool.query(`INSERT INTO users (pseudo, email, token, salt, hash, role, preferences) VALUES ('${pseudo}', '${email}','${token}','${salt}', '${hash}', '${role}', '{"darkmode"}')`, (error, results) => {
        if (error){
            throw error
        }
        else {
            console.log("Fixture loaded ! you can now connect as admin")
        }
    })
}

fixtureLoad()