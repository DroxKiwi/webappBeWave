const logger = require("../Utils/logger")
const userCRUD = require("../CRUD/user")
const logCRUD = require("../CRUD/log")
const betatesterCRUD = require("../CRUD/betatesteur")
const contactCRUD = require("../CRUD/contact")
const generateRandomPassword = require ("../Utils/generatePassword")


// Landing page of dashboard
async function homeDashboard(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        // We send the preferences to the twig template 
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "userList": await userCRUD.get()
        }
        res.render('./Templates/AdminDashboard/dashboard.html.twig', { ...templateVars })
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
            const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
            const templateVars = {
                "id": req.pseudo,
                "preference": preferencesTab[0].preferences[0]
            }
            res.render('./Templates/AdminDashboard/createuser.html.twig', { ...templateVars })
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
        const message = "Update a user : "+pseudo 
        logger.newLog(req.cookies.userToken.token, message)
        await userCRUD.update(user_id, pseudo, email, password, role)
        res.redirect(302, '/dashboard')
    }
    else {
        res.redirect(302, '/')
    }
}

async function adminDeleteUserAccount(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { user_id } = req.body
        const email = await userCRUD.get('email', 'user_id', user_id)
        message = "Delete an user : "+email
        logger.newLog(req.cookies.userToken.token, message)
        userCRUD.remove(user_id)
        res.redirect(302, "/dashboard")
    }
}

async function adminResetUserPassword(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { user_id } = req.body
        const length = 10
        const password = generateRandomPassword(length)
        const answer_user_pseudo = await userCRUD.get('pseudo', 'user_id', user_id)
        const pseudo = answer_user_pseudo[0].pseudo
        message = "Reset a password for : "+pseudo+" new password : "+password
        logger.newLog(req.cookies.userToken.token, message)
        await userCRUD.update(user_id, '', '', password, '', '')
        res.redirect(302, 'dashboard')
    }
}

// Show a user profile
async function showDetailUser(req, res){
    const { user_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const userToShow = await userCRUD.get('*', 'user_id', user_id)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "user_id": user_id,
            "pseudo": userToShow[0].pseudo,
            "email": userToShow[0].email,
            "token": userToShow[0].token,
            "role": userToShow[0].role,
            "userLogs": await logCRUD.get('*', 'user_id', user_id),
            "betatesterInfo": await betatesterCRUD.get('*', 'user_id', user_id)
        }
        res.render('./Templates/AdminDashboard/showuser.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

// Show the logs
async function showLogs(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "logsList": await logCRUD.get()
        }
        res.render('./Templates/AdminDashboard/logs.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

// Show the contact form sent by users
async function showFormcontact(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "contactsForm": await contactCRUD.get()
        }
        res.render('./Templates/AdminDashboard/formcontact.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function showCruds(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0]
        }
        res.render('./Templates/AdminDashboard/showcruds.html.twig', { ...templateVars })
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
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const modeleSQL = "%"+searchrequest+"%"
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "userList": await userCRUD.get('*', ['pseudo', 'email', 'role'], "", true, modeleSQL, 'OR')
        }
        res.render('./Templates/AdminDashboard/dashboard.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

module.exports = { homeDashboard, adminCreatUser, adminUpdateUserAccount, adminDeleteUserAccount, adminResetUserPassword, showDetailUser, showLogs, showFormcontact, showCruds, searchUser }