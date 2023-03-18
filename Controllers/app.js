const pool = require('../Utils/db');
const logger = require("../Utils/logger")


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


module.exports = { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin, redirectCreateAccount, redirectInformation, redirectSettings, redirectReport, redirectBetatesterDelete }