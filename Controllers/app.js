const { Pool } = require('pg');


// Configuration Used with nodemon in local dev environnement
//const pool = new Pool({
//    user: 'postgres',
//    host: 'localhost',
//    database: 'database_dev_studiecf',
//    password: 'psqlpsw',
//})

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
})

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

// Redirection to the suscribe page
async function redirectSuscribe(req, res){
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
                pool.query(`SELECT pseudo, email FROM users WHERE token = '${userToken}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        const pseudo = results.rows[0].pseudo
                        const email = results.rows[0].email
                        const templateVars = [id, modepreference, pseudo, email]
                        res.render('./Templates/information.html.twig', { templateVars })
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


module.exports = { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin, redirectCreateAccount, redirectInformation, redirectSettings, redirectReport }