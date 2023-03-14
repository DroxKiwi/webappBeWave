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
    // ROLE_ADMIN needed to get users in DB
    if (req.role != "ROLE_ADMIN"){
        return res.json("Only ADMIN can do that !")
    }
    else {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                throw error;
            }
            res.send(results.rows);
        });
    }
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
    if (req.role == "unauthentificated"){
        return res.json("You can't have acces ! You need to log in first !")
    }
    else {
        if (!req.body.row || !req.body.value){
            return res.json("Row to update or the value it self is missing")
        }
        else {
            const value = req.body.value
            const row = req.body.row
            const userToken = req.cookies.userToken.token
            if (row == "password"){
                await pool.query(`SELECT user_id FROM users WHERE token = '${userToken}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    const user_id = results.rows[0].user_id
                    if (!user_id){
                        return res.send("No match found ! Contact an Admin")
                    }
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
                await pool.query(`UPDATE users SET ${row} = '${value}' WHERE token = '${userToken}'`, (error, results) => {
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
    if (req.role != "ROLE_ADMIN"){
        return res.json("Only ADMIN can do that !")
    }
    else {
        const target_pseudo = req.body.target_pseudo
        if (!req.body.target_pseudo){
            return res.send("MIssing pseudo to confirm wich one you want to delete")
        }
        else {
            await pool.query(`SELECT user_id FROM users WHERE pseudo = '${target_pseudo}'`, (error, results) => {
                if (error){
                    throw error
                }
                const selectedUser = results.rows[0]
                if (!selectedUser){
                    return res.json('No user found with this pseudo !')
                }
                else {
                    pool.query(`DELETE FROM users WHERE pseudo = '${target_pseudo}'`, (error, results) => {
                        if (error){
                            throw error
                        }
                        return res.send("Succefuly deleted")
                    })
                }
            })
        }
    }
}

async function userLogin(req, res){
    const { id, password, remember } = req.body
    if (!req.body.id || !req.body.password){
        res.send("pseudo, email or password missing")
    }
    else {
        // Users can log with an email or pseudo
        await pool.query(`SELECT * FROM users WHERE pseudo = '${id}'`, (error, results) => {
            if (error){
                throw error
            }
            if (!results.rows[0]){
                pool.query(`SELECT * FROM users WHERE email = '${id}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    if (!results.rows[0]){
                        return res.send("No user found")
                    }
                    else {
                        const currentUser = results.rows[0]
                        const userToken = decryptPassword(currentUser, password)
                        if (!userToken){
                            return res.send('Authentication impossible, check your password')
                        }
                        else {
                            res.cookie('userToken', userToken, { maxAge: 900000, httpOnly: true });
                            res.send('Authentication successful');
                        }
                    }
                })
            }
            else {
                const currentUser = results.rows[0]
                const userToken = decryptPassword(currentUser, password)
                if (!userToken){
                    return res.send('Authentication impossible, check your password')
                }
                else {
                    if (remember){
                        // token is saved for 1 year
                        res.cookie('userToken', userToken, { maxAge: 15552000000, httpOnly: true });
                        //res.send('Authentication successful');
                        res.redirect(302, '/')
                    }
                    else {
                        // token is saved for 25 minutes
                        res.cookie('userToken', userToken, { maxAge: 900000, httpOnly: true });
                        //res.send('Authentication successful');
                        res.redirect(302, '/')
                    }
                }
            }
        })
    }
}

// Used to delete cookies 
async function userLogout(req, res){
    res.clearCookie('userToken')
    res.redirect(302, '/')
    //res.redirect('/')
}

module.exports = { usersGet, userCreate, userUpdate, userDelete, userLogin, userLogout }