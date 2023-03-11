const encryptPassword = require("../Utils/encryptPassword")
const decryptPassword = require("../Utils/decryptPassword")
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})


// Get all the users stored into the database
async function usersGet(req, res){
    //if (req.role == "ROLE_ADMIN"){
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                throw error;
            }
            res.send(results.rows);
        });
    //}
    //else {
    //    return res.send("You can't access")
    //}
}

// Creatin a new user
async function userCreate(req, res){
    let pseudo = req.body.pseudo
    let email = req.body.email
    const {token, salt, hash} = encryptPassword(req.body.password)
    let role = "ROLE_USER"
    await pool.query(`INSERT INTO users (pseudo, email, token, salt, hash, role) VALUES ('${pseudo}', '${email}','${token}','${salt}', '${hash}', '${role}')`, (error, results) => {
        if (error) {
            throw error
        }
        res.send(results.rows)
    })
}

// Update of an existing user
async function userUpdate(req, res){
    if (!req.cookies.userToken){
        return res.json("You can't have acces ! You need to log in first !")
    }
    else {
        if (!req.body.row || !req.body.value){
            return res.json("Row to update or the value it self is missing")
        }
        else {
            const value = req.body.value
            const row = req.body.row
            const token = req.cookies.token
            if (row == "password"){
                await pool.query(`SELECT user_id FROM users WHERE token = '${token}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    const user_id = results.rows[0].user_id
                    const {token, salt, hash} = encryptPassword(value)
                    pool.query(`UPDATE users SET token = '${token}', salt = '${salt}', hash = '${hash}' WHERE user_id = '${user_id}'`, (error, results) => {
                        if (error){
                            throw error
                        }
                        res.send('Password succefuly updated !')
                    })
                })
            }
            else {
                await pool.query(`UPDATE users SET ${row} = '${value}' WHERE token = '${token}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    res.send(row+' Succefuly updated !')
                });
            }
        }
    }
}

// Delete a user by pseudo selection
async function userDelete(req, res){
    const target_pseudo = req.body.target_pseudo
    if (!req.body.target_pseudo){
        return res.send("MIssing pseudo to confirm wich one you want to delete")
    }
    else {
        await pool.query(`DELETE FROM users WHERE pseudo = '${target_pseudo}'`, (error, results) => {
            if (error){
                throw error
            }
            res.send(results)
        })
    }
}

async function userLogin(req, res){
    if (!req.body.pseudo || !req.body.password){
        res.json("pseudo or password missing")
    }
    else {
        const pseudo = req.body.pseudo
        const password = req.body.password
        await pool.query(`SELECT * FROM users WHERE pseudo = '${pseudo}'`, (error, results) => {
            if (error){
                throw error
            }
            if (!results.rows[0]){
                return res.json("No user found")
            }
            else {
                const currentUser = results.rows[0]
                const userToken = decryptPassword(currentUser, password)
                if (!userToken){
                    return res.json('Authentication impossible, check user _id or password')
                }
                else {
                    res.cookie('userToken', userToken, { maxAge: 900000, httpOnly: true });
                    res.send('Authentication successful');
                }
            }
        })
    }
}

module.exports = { usersGet, userCreate, userUpdate, userDelete, userLogin }