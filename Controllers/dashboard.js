const pool = require('../Utils/db')
const logger = require("../Utils/logger")
const encryptPassword = require("../Utils/encryptPassword")
const userCRUD = require("../CRUD/user")
const { query } = require('express')

// Landing page of dashboard
async function homeDashboard(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preferences = preferencesTab[0].preferences[0]
        const usersList = await userCRUD.get()
        // We send the preferences to the twig template 
        const templateVars = [id, preferences, usersList]
        res.render('./Templates/AdminDashboard/dashboard.html.twig', { templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

// Create an user from dashboard
async function adminCreatUser(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { admincreateuser } = req.body
        if (admincreateuser == "true"){
            const { pseudo, email, password, role } = req.body
    
            const message = "Create a user -> pseudo : "+pseudo+", email : "+email+", role : "+role
            logger.newLog(req.cookies.userToken.token, message)
    
            await userCRUD.create(pseudo, email, password, role)
            res.redirect(302, '/dashboard')
        }
        else {
            const userToken = req.cookies.userToken.token
            const id = req.pseudo
            const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
            const preferences = preferencesTab[0].preferences[0]
            const templateVars = [id, preferences]
            res.render('./Templates/AdminDashboard/createuser.html.twig', { templateVars })
        }
    }
    else {
        res.redirect(302, '/')
    }
}

async function adminUpdateUserAccount(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { pseudo, email, password, role, user_id } = req.body
        // Here we are updating an user giving by his user_id. Only Admin can do that
        // To make a difference between an update of his own account or the update of an user account, I implement a value nonselfupdate
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
    else {
        res.redirect(302, '/')
    }
}

async function adminDeleteUserAccount(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { user_id } = req.body
        pool.query(`SELECT email FROM users WHERE user_id = '${user_id}'`, (error ,results) => {
            if (error){
                throw error
            }
            else {
                const email = results.rows[0].email
                message = "Delete an user : "+email
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
}

// Show a user profile
async function showDetailUser(req, res){
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

// Show the logs
async function showLogs(req, res){
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

// Show the contact form sent by users
async function showFormcontact(req, res){
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

// Return the search request made
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

module.exports = { homeDashboard, adminCreatUser, adminUpdateUserAccount, adminDeleteUserAccount, showDetailUser, showLogs, showFormcontact, searchUser }