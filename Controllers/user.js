const encryptPassword = require("../Utils/encryptPassword")
const logger = require("../Utils/logger")
const pool = require('../Utils/db')

// Get all the users stored into the database and send it to the dashboard
async function userRead(req, res){
    // ROLE_ADMIN needed to get users in DB
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        // We select into the database the preferences in link with the current user connected by checking the token
        pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                const modepreference = results.rows[0].preferences[0]
                pool.query(`SELECT user_id, pseudo, email, role FROM users`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        const users = results.rows
                        // We send the preferences to the twig template 
                        const templateVars = [id, modepreference, users]
                        res.render('./Templates/AdminDashboard/dashboard.html.twig', { templateVars })
                    }
                })
            }
        })
    }
    else {
        res.redirect(302, '/')
    }
}

// Creat a new user
async function userCreate(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { pseudo, email, password, role } = req.body
        const {token, salt, hash} = encryptPassword(password)

        message = "Create a user -> pseudo : "+pseudo+", email : "+email+", role : "+role
        logger.newLog(req.cookies.userToken.token, message)

        pool.query(`SELECT pseudo, email FROM users WHERE pseudo = '${pseudo}' OR email = '${email}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                // We check if a user is allready existing with this email or pseudo
                if (!results.rows[0]){
                    pool.query(`INSERT INTO users (pseudo, email, token, salt, hash, role, preferences) VALUES ('${pseudo}', '${email}','${token}','${salt}', '${hash}', '${role}', '{"darkmode"}')`, (error, results) => {
                        if (error) {
                            throw error
                        }
                        res.redirect(302, '/dashboard')
                    })
                }
                else {
                    res.send("Un compte existe déjà avec ses identifiants !")
                }
            }
        } )
    }
    else {
        const { pseudo, email, password } = req.body
        const {token, salt, hash} = encryptPassword(password)
        let role = "ROLE_USER"
        pool.query(`SELECT pseudo, email FROM users WHERE pseudo = '${pseudo}' OR email = '${email}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                // We check if a user is allready existing with this email or pseudo
                if (!results.rows[0]){
                    pool.query(`INSERT INTO users (pseudo, email, token, salt, hash, role, preferences) VALUES ('${pseudo}', '${email}','${token}','${salt}', '${hash}', '${role}', '{"darkmode"}')`, (error, results) => {
                        if (error) {
                            throw error
                        }
                        res.redirect(302, '/')
                    })
                }
                else {
                    res.send("Un compte existe déjà avec ses identifiants !")
                }
            }
        } )
    }
}

// Update an existing user
async function userUpdate(req, res){
    if (req.role != "ROLE_USER" && req.role != "ROLE_ADMIN"){
        res.redirect(302, '/')
    }
    else {
        const { pseudo, email, password, role, nonselfupdate, user_id } = req.body

        // Here we are updating an user giving by his user_id. Only Admin can do that
        // To make a difference between an update of his own account or the update of an user account, I implement a value nonselfupdate
        if (req.role == "ROLE_ADMIN" && nonselfupdate == "true"){

            message = "Update a user : "+pseudo 
            logger.newLog(req.cookies.userToken.token, message)

            pool.query(`SELECT * FROM users WHERE user_id = '${user_id}'`, (error, results) => {
                if (error){
                    throw error
                }
                else {
                    const currentUser_id = results.rows[0].user_id
                    if (password == ""){
                        pool.query(`UPDATE users SET pseudo = '${pseudo}', email = '${email}', role = '${role}' WHERE user_id = '${currentUser_id}'`, (error, results) => {
                            if (error){
                                throw error
                            }
                            else {
                                res.redirect(302, '/dashboard')
                            }
                        })
                    }
                    else {
                        const {token, salt, hash} = encryptPassword(password)
                        pool.query(`UPDATE users set pseudo = '${pseudo}', email = '${email}', token = '${token}', salt = '${salt}', hash = '${hash}', role = '${role}' WHERE user_id = '${currentUser_id}'`, (error, results) => {
                            if (error){
                                throw error
                            }
                            else {
                                res.redirect(302, '/dashboard')
                            }
                        })
                    }
                }
            })
        }
        // Here we are updating the user account itself (the one beeing connected)
        else {
            const userToken = req.cookies.userToken.token
            message = "Update is account pseudo : "+pseudo
            logger.newLog(req.cookies.userToken.token, message)

            //const { pseudo, email, password } = req.body
            // To verify which form is send we check if pseudo, email or password is true (not null)
            if (pseudo){
                const row = "pseudo"
                const value = pseudo
                pool.query(`UPDATE users SET ${row} = '${value}' WHERE token = '${userToken}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    res.redirect(302, '/information')
                });
            }
            if (email){
                const row = "email"
                const value = email
                pool.query(`UPDATE users SET ${row} = '${value}' WHERE token = '${userToken}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    res.redirect(302, '/information')
                });
            }
            if (password){
                const value = password
                pool.query(`SELECT user_id FROM users WHERE token = '${userToken}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    const user_id = results.rows[0].user_id
                    if (!user_id){
                        return res.send("Aucun compte trouvé ! Contacter un Admin si nécessaire")
                    }
                    const {token, salt, hash} = encryptPassword(value)
                    pool.query(`UPDATE users SET token = '${token}', salt = '${salt}', hash = '${hash}' WHERE user_id = '${user_id}'`, (error, results) => {
                        if (error){
                            throw error
                        }
                        res.redirect(302, '/information')
                    })
                })
            }
        }
    }
}

// Delete a user by token selection
async function userDelete(req, res){
    if (req.role != "ROLE_USER" && req.role != "ROLE_ADMIN"){
        return res.json("Seulement les Admins peuvent effectuer cette action")
    }
    else {
        const { user_id, nonselfupdate } = req.body
        if (req.role == "ROLE_ADMIN" && nonselfupdate == "true"){
            pool.query(`SELECT pseudo FROM users WHERE user_id = '${user_id}'`, (error ,results) => {
                if (error){
                    throw error
                }
                else {
                    const pseudo = results.rows[0].pseudo
                    message = "Delete an user : "+pseudo
                    logger.newLog(req.cookies.userToken.token, message)
                    pool.query(`DELETE FROM users WHERE user_id = '${user_id}'`, (error, results) => {
                        if (error){
                            throw error
                        }
                        else {
                            res.redirect(302, "/dashboard")
                        }
                    })
                }
            })
        }
        else {
            const userToken = req.cookies.userToken.token
            // first we check if the current token is matching an user_id 
            pool.query(`SELECT user_id FROM users WHERE token = '${userToken}'`, (error, results) => {
                if (error){
                    throw error
                }
                else {
                    const selectedUserId = results.rows[0].user_id
                    const pseudo = req.pseudo
                    if (!selectedUserId){
                        return res.json('Aucun utilisateur trouvé via vos identifiants de compte ! Contactez un Admin')
                    }
                    else {
                        message = "Delete his account : "+pseudo
                        logger.newLog(req.cookies.userToken.token, message)
                        // If yes, we delete it
                        pool.query(`DELETE FROM users WHERE user_id = '${selectedUserId}'`, (error, results) => {
                            if (error){
                                throw error
                            }
                            res.redirect(302, '/')
                        })
                    }
                }
            })
        }
    }
}


module.exports = { userRead, userCreate, userUpdate, userDelete }