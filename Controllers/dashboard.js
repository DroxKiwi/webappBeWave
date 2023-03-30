const pool = require('../Utils/db');


async function redirectDashboard(req, res){
    if (req.role == "ROLE_ADMIN"){
        res.redirect(302, 'usersGet')
    }
    else {
        res.redirect(302, '/')
    }
}

async function redirectAdminCreatUser(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
      
        pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                modepreference = results.rows[0].preferences[0]
                const templateVars = [id, modepreference]
                res.render('./Templates/AdminDashboard/createuser.html.twig', { templateVars })
            }
        })
    }
    else {
        res.redirect(302, '/')
    }
}

async function redirectShowUser(req, res){
    const { user_id } = req.body
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
                pool.query(`SELECT * FROM users WHERE user_id = '${user_id}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        pseudo = results.rows[0].pseudo
                        email = results.rows[0].email
                        token = results.rows[0].token
                        role = results.rows[0].pseudo
                        pool.query(`SELECT * FROM logs WHERE user_id = '${user_id}'`, (error, results) => {
                            if (error){
                                throw error
                            }
                            else {
                                const logs = results.rows
                                pool.query(`SELECT * FROM betatesters WHERE user_id = '${user_id}'`, (error, results) => {
                                    if (error){
                                        throw error
                                    }
                                    else {
                                        const betatester_info = results.rows[0]
                                        if (!betatester_info){
                                            const templateVars = [ id, modepreference, user_id, pseudo, email, token, role, logs, "null" ]
                                            res.render('./Templates/AdminDashboard/showuser.html.twig', { templateVars })
                                        }
                                        else {
                                            const templateVars = [ id, modepreference, user_id, pseudo, email, token, role, logs, betatester_info ]
                                            res.render('./Templates/AdminDashboard/showuser.html.twig', { templateVars })
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    else {
        res.redirect(302, '/')
    }
}

async function redirectLogs(req, res){
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
                pool.query(`SELECT * FROM logs`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        const logs = results.rows
                        const templateVars = [ id, modepreference, logs ]
                        res.render('./Templates/AdminDashboard/logs.html.twig', { templateVars })
                    }
                })
            }
        })
    }
    else {
        res.redirect(302, "/")
    }
}

async function redirectFormcontact(req, res){
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
                pool.query(`SELECT * FROM contacts`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else {
                        const formcontacts = results.rows
                        const templateVars = [ id, modepreference, formcontacts ]
                        res.render('./Templates/AdminDashboard/formcontact.html.twig', { templateVars })
                    }
                })
            }
        })
    }
    else {
        res.redirect(302, "/")
    }
}


async function searchUser(req, res){
    if (req.role == "ROLE_ADMIN"){
        // Here we are managing the search bar request 
        const { searchrequest } = req.body
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        // We select into the database the preferences in link with the current user connected by checking the token
        pool.query(`SELECT preferences FROM users WHERE token = '${userToken}'`, (error, results) => {
            if (error){
                throw error
            }
            else {
                const modepreference = results.rows[0].preferences[0]
                // I define a modele based SQL to use LIKE statement to send every user where an email, pseudo token or even role is matching
                const modeleSQL = "%"+searchrequest+"%"
                pool.query(`SELECT * FROM users WHERE pseudo LIKE '${modeleSQL}' OR email LIKE '${modeleSQL}' OR token LIKE '${modeleSQL}' OR role LIKE '${modeleSQL}'`, (error, results) => {
                    if (error){
                        throw error
                    }
                    else{
                        const length = results.rows.length
                        const users = results.rows
                        const templateVars = [id, modepreference, users, length]
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

module.exports = { redirectDashboard, redirectAdminCreatUser, redirectShowUser, redirectLogs, redirectFormcontact, searchUser }