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
    const { pseudo, email, password } = req.body
    const {token, salt, hash} = encryptPassword(password)
    let role = "ROLE_USER"
    await pool.query(`SELECT pseudo, email FROM users WHERE pseudo = '${pseudo}' OR email = '${email}'`, (error, results) => {
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

// Update of an existing user
async function userUpdate(req, res){
    if (req.role != "ROLE_USER" && req.role != "ROLE_ADMIN"){
        res.redirect(302, '/')
    }
    else {
        const userToken = req.cookies.userToken.token
        const { pseudo, email, password } = req.body
        // To verify which form is send we check if pseudo, email or password is true (not null)
        if (pseudo){
            const row = "pseudo"
            const value = pseudo
            await pool.query(`UPDATE users SET ${row} = '${value}' WHERE token = '${userToken}'`, (error, results) => {
                if (error){
                    throw error
                }
                res.redirect(302, '/information')
            });
        }
        if (email){
            const row = "email"
            const value = email
            await pool.query(`UPDATE users SET ${row} = '${value}' WHERE token = '${userToken}'`, (error, results) => {
                if (error){
                    throw error
                }
                res.redirect(302, '/information')
            });
        }
        if (password){
            const value = password
            await pool.query(`SELECT user_id FROM users WHERE token = '${userToken}'`, (error, results) => {
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

// Delete a user by token selection
async function userDelete(req, res){
    if (req.role != "ROLE_USER" && req.role != "ROLE_ADMIN"){
        return res.json("Seulement les Admins peuvent effectuer cette action")
    }
    else {
        const userToken = req.cookies.userToken.token
        // first we check if the current token is matching an user_id 
        await pool.query(`SELECT user_id FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            const selectedUserId = results.rows[0].user_id
            if (!selectedUserId){
                return res.json('Aucun utilisateur trouvé via vos identifiants de compte ! Contactez un Admin')
            }
            else {
                // If yes, we delete it
                pool.query(`DELETE FROM users WHERE user_id = '${selectedUserId}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    res.redirect(302, '/')
                })
            }
        })
    }
}

async function userLogin(req, res){
    const { id, password, remember } = req.body
    // Users can log with an email or pseudo
    await pool.query(`SELECT * FROM users WHERE pseudo = '${id}'`, (error, results) => {
        if (error){
            throw error
        }
        // If no pseudo matching was found we search with the email
        if (!results.rows[0]){
            pool.query(`SELECT * FROM users WHERE email = '${id}'`, (error, results) => {
                if (error){
                    throw error
                }
                if (!results.rows[0]){
                    return res.send("Aucun utilisateur trouvé ! Contactez un Admin ou vérifiez vos identifiants")
                }
                else {
                    const currentUser = results.rows[0]
                    // Once an email is found, we decrypt the password to check if it match
                    const userToken = decryptPassword(currentUser, password)
                    if (!userToken){
                        return res.send('Connexion impossible, vérifiez votre mot de passe')
                    }
                    else {
                        const currentRole = currentUser.role
                        // If the user want to be log in for long time, we create a 1 year token
                        if (remember){
                            // token is saved for 1 year
                            res.cookie('userToken', userToken, { maxAge: 15552000000, httpOnly: true });
                            //res.send('Authentication successful');
                            if (currentRole == "ROLE_USER"){
                                res.redirect(302, '/')
                            }
                            if (currentRole == "ROLE_ADMIN") {
                                res.redirect(302, '/admin')
                            }         
                        }
                        else {
                            // token is saved for 25 minutes
                            res.cookie('userToken', userToken, { maxAge: 900000, httpOnly: true });
                            //res.send('Authentication successful');
                            if (currentRole == "ROLE_USER"){
                                res.redirect(302, '/')
                            }
                            if (currentRole == "ROLE_ADMIN") {
                                res.redirect(302, '/admin')
                            }         
                        }
                    }
                }
            })
        }
        // If the pseudo is found we decrypt the password to check if it match
        else {
            const currentUser = results.rows[0]
            const userToken = decryptPassword(currentUser, password)
            if (!userToken){
                return res.send('Connexion impossible, vérifiez votre mot de passe')
            }
            else {
                const currentRole = currentUser.role
                if (remember){
                    // token is saved for 1 year
                    res.cookie('userToken', userToken, { maxAge: 15552000000, httpOnly: true });
                    //res.send('Authentication successful');
                    if (currentRole == "ROLE_USER"){
                        res.redirect(302, '/')
                    }
                    if (currentRole == "ROLE_ADMIN") {
                        res.redirect(302, '/admin')
                    }
                }
                else {
                    // token is saved for 25 minutes
                    res.cookie('userToken', userToken, { maxAge: 900000, httpOnly: true });
                    //res.send('Authentication successful');
                    if (currentRole == "ROLE_USER"){
                        res.redirect(302, '/')
                    }
                    if (currentRole == "ROLE_ADMIN") {
                        res.redirect(302, '/admin')
                    }                
                }
            }
        }
    })
}

// Used to delete cookies 
async function userLogout(req, res){
    res.clearCookie('userToken')
    res.redirect(302, '/')
    //res.redirect('/')
}

module.exports = { usersGet, userCreate, userUpdate, userDelete, userLogin, userLogout }