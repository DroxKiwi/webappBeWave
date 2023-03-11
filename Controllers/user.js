const encryptPassword = require("../Utils/encryptPassword")
const decryptPassword = require("../Utils/decryptPassword")
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})


// Get all the users stored into the database
async function usersGet(req, res){
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
}

// Creatin a new user
async function userCreate(req, res){
    let pseudo = req.body.pseudo
    let email = req.body.email
    const {token, salt, hash} = encryptPassword(req.body.password)
    let role = "ROLE_USER"
    pool.query(`INSERT INTO users (pseudo, email, token, salt, hash, role) VALUES ('${pseudo}', '${email}','${token}','${salt}', '${hash}', '${role}')`, (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
}

module.exports = { usersGet, userCreate }