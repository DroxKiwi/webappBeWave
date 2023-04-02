const pool = require('../Utils/db')
const logger = require("../Utils/logger")
const decryptPassword = require("../Utils/decryptPassword")
const generateRandomPassword = require ("../Utils/generatePassword")


// Redirection to the landingpage
async function redirectHomepage(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        // We select into the database the preferences in link with the current user connected by checking the token
        pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                // We send the preferences to the twig template 
                modepreference = results.rows[0].preferences[0]
                const role = req.role
                const templateVars = [id, modepreference, role]
                res.render('./Templates/home.html.twig', { templateVars })
            }
        })
    }
    else {
        // This variable "id" allowed the twig template to adapt what it need to show (connection button, create account button, ...)
        const id = "unauthentificated"
        res.render('./Templates/home.html.twig', { id })
    }
}

// Redirection to the contact page
async function redirectContact(req, res){
    const { sendContact, message, type } = req.body
    if ( sendContact == "true" ){
        const userToken = req.cookies.userToken.token
        pool.query(`SELECT user_id FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                const user_id = results.rows[0].user_id
                pool.query(`INSERT INTO contacts (user_id, type, message) VALUES ('${user_id}', '${type}', '${message}')`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        const userToken = req.cookies.userToken.token
                        const id = req.pseudo
                        pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
                            if (error){
                                throw error
                            }
                            else {
                                // We send the preferences to the twig template 
                                modepreference = results.rows[0].preferences[0]
                                const role = req.role
                                const formSend = "Votre formulaire a bien été pris en compte !"
                                const templateVars = [id, modepreference, role, formSend]
                                res.render('./Templates/contact.html.twig', { templateVars })
                            }
                        })
                    }
                })
            }
        })
    }
    else {
        if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
            const userToken = req.cookies.userToken.token
            const id = req.pseudo
            pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
                if (error){
                    throw error
                }
                else {
                    // We send the preferences to the twig template 
                    modepreference = results.rows[0].preferences[0]
                    const role = req.role
                    const templateVars = [id, modepreference, role]
                    res.render('./Templates/contact.html.twig', { templateVars })
                }
            })
        }
        else {
            const id = "unauthentificated"
            res.render('./Templates/contact.html.twig', { id })
        }
    }
}

// Redirection to the suscribe page
async function redirectSuscribe(req, res){
    const { consent, suscribeBeta, firstname, name, dob, adress, phone } = req.body
    if (suscribeBeta == "true"){
        const userToken = req.cookies.userToken.token
        const pseudo = req.pseudo
        pool.query(`SELECT user_id FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                const user_id = results.rows[0].user_id
                message = pseudo+" : suscribe to beta tester"
                logger.newLog(req.cookies.userToken.token, message)
                pool.query(`INSERT INTO betatesters (user_id, firstname, name, dob, adress, phone) VALUES ('${user_id}', '${firstname}', '${name}', '${dob}', '${adress}', '${phone}')`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        res.redirect(302, '/')
                    }
                })
            }
        })
    }
    else {
        if (!consent){
            if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
                const userToken = req.cookies.userToken.token
                const id = req.pseudo
                pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        // We send the preferences to the twig template 
                        modepreference = results.rows[0].preferences[0]
                        const role = req.role
                        const templateVars = [id, modepreference, role]
                        res.render('./Templates/suscribe.html.twig', { templateVars })
                    }
                })
            }
            else {
                const id = "unauthentificated"
                res.render('./Templates/suscribe.html.twig', { id })
            }
        }
        else {
            if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
                const userToken = req.cookies.userToken.token
                const id = req.pseudo
                pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        // We send the preferences to the twig template 
                        modepreference = results.rows[0].preferences[0]
                        const role = req.role
                        const templateVars = [id, modepreference, role]
                        res.render('./Templates/createbetatester.html.twig', { templateVars })
                    }
                })
            }
            else {
                const id = "unauthentificated"
                res.render('./Templates/login.html.twig', { id })
            }
        }
    }
}

async function redirectBetatesterDelete(req, res){
    const { nonselfupdate, user_id, userPseudo } = req.body
    if (!nonselfupdate){
        if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
            const userToken = req.cookies.userToken.token
            const pseudo = req.pseudo
            pool.query(`SELECT user_id FROM users WHERE token = '${userToken}'`, (error, results) => {
                if (error){
                    throw error
                }
                else {
                    const user_id = results.rows[0].user_id
                    message = pseudo+" : delete his account from beta tester"
                    logger.newLog(req.cookies.userToken.token, message)
                    pool.query(`DELETE FROM betatesters WHERE user_id = '${user_id}'`, (error, results) => {
                        if (error){
                            throw error
                        }
                        else {
                            res.redirect(302, '/information')
                        }
                    })
                }
            })
        }
    }
    else {
        const pseudo = req.pseudo
        message = pseudo+" : delete "+userPseudo+" account from beta tester"
        logger.newLog(req.cookies.userToken.token, message)
        pool.query(`DELETE FROM betatesters WHERE user_id = '${user_id}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                res.redirect(302, '/dashboard')
            }
        })
    }
}

// Redirection to the login form
async function redirectLogin(req, res){
    res.render('./Templates/login.html.twig')
}

// Redirection to the creation form
async function redirectCreateAccount(req, res){
    res.render('./Templates/createaccount.html.twig')
}

// Redirection to the information page account
async function redirectInformation(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                modepreference = results.rows[0].preferences[0]
                pool.query(`SELECT user_id, pseudo, email FROM users WHERE token = '${userToken}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        const user_id = results.rows[0].user_id
                        const pseudo = results.rows[0].pseudo
                        const email = results.rows[0].email
                        pool.query(`SELECT * FROM betatesters WHERE user_id = '${user_id}'`, (error, results) => {
                            if (error){
                                throw error
                            }
                            else {
                                if (!results.rows[0]){
                                    const templateVars = [id, modepreference, pseudo, email]
                                    res.render('./Templates/information.html.twig', { templateVars })
                                }
                                else {
                                    const betatesters_info = results.rows[0]
                                    const templateVars = [id, modepreference, pseudo, email, betatesters_info]
                                    res.render('./Templates/information.html.twig', { templateVars })
                                }
                            }
                        })
                    }
                })
            }
        })
    }
    // If the user is not loged, we redirect him to the landingpage
    else {
        res.redirect(302, '/')
    }
}

// Redirection to the settings account page
async function redirectSettings(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                modepreference = results.rows[0].preferences[0]
                const templateVars = [id, modepreference]
                res.render('./Templates/settings.html.twig', { templateVars })
            }
        })
    }
    else {
        res.redirect(302, '/')
    }
}

// Redirection to the report page
async function redirectReport(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                modepreference = results.rows[0].preferences[0]
                const templateVars = [id, modepreference]
                res.render('./Templates/report.html.twig', { templateVars })
            }
        })
    }
    else {
        res.redirect(302, '/')
    }
}

async function userLogin(req, res){
    const { id, password, remember } = req.body

    // Users can log with an email or pseudo
    pool.query(`SELECT * FROM users WHERE pseudo = '${id}'`, (error, results) => {
        if (error){
            throw error
        }
        // If no pseudo matching was found  we search with the email
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

                        message = "Log in : "+currentUser.pseudo
                        logger.newLog(currentUser.token, message)

                        // If the user want to be log in for long time, we create a 1 year token
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
        // If the pseudo is found we decrypt the password to check if it match
        else {
            const currentUser = results.rows[0]
            const userToken = decryptPassword(currentUser, password)
            if (!userToken){
                return res.send('Connexion impossible, vérifiez votre mot de passe')
            }
            else {

                message = "Log in : "+currentUser.pseudo
                logger.newLog(currentUser.token, message)

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

// Used to delete cookies 
async function userLogout(req, res){

    userToken = req.cookies.userToken.token

    pool.query(`SELECT pseudo FROM users WHERE token = '${userToken}'`, (error, results) => {
        if (error){
            throw error
        }
        else {
            pseudo = results.rows[0].pseudo
            message = "Log out : "+pseudo
            logger.newLog(req.cookies.userToken.token, message)
        
            res.clearCookie('userToken')
            res.redirect(302, '/')
            //res.redirect('/')
        }
    })
}


// Here we set the preferences choosen by the user into the databse
async function settingsPreferences(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { colorapp } = req.body
        pool.query(`UPDATE users SET preferences[0] = '${colorapp}' WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                res.redirect(302, '/settings')
            }
        })
    }
    else {
        res.redirect(302, '/')
    }
}

// I had to make an other function and form for a request of password resest because the tag "<input type='checkbox' isn't working"
async function resetPassword(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { user_id } = req.body
        const length = 5
        const password = generateRandomPassword(length)
        const {token, salt, hash} = encryptPassword(password)

        pool.query(`SELECT pseudo FROM users WHERE user_id = '${user_id}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                const pseudo = results.rows[0].pseudo
                message = "Reset a password for : "+pseudo
                logger.newLog(req.cookies.userToken.token, message)
        
                pool.query(`UPDATE users SET token = '${token}', salt = '${salt}', hash = '${hash}' WHERE user_id = '${user_id}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        // Here the application is supposed to send the new password to the user
                        console.log(password)
                        res.redirect(302, 'dashboard')
                    }
                })
            }
        })
    }
}


async function updateUserAccount(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const { pseudo, email, password } = req.body
        // Here we are updating the user account itself (the one beeing connected)
        const userToken = req.cookies.userToken.token
        message = "Update is account pseudo : "+pseudo
        logger.newLog(req.cookies.userToken.token, message)
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
    else {
        res.redirect(302, '/')
    }
}

// Delete a user by token selection
async function deleteUserAccount(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
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

module.exports = { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin, redirectCreateAccount, redirectInformation, redirectSettings, redirectReport, redirectBetatesterDelete, settingsPreferences, userLogin, userLogout, resetPassword, updateUserAccount, deleteUserAccount }