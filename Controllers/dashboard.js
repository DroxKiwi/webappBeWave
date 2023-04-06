const logger = require("../Utils/logger")
const userCRUD = require("../CRUD/user")
const logCRUD = require("../CRUD/log")
const betatesterCRUD = require("../CRUD/betatesteur")
const contactCRUD = require("../CRUD/contact")

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
            const preference = preferencesTab[0].preferences[0]
            const templateVars = [id, preference]
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

// Show a user profile
async function showDetailUser(req, res){
    const { user_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preference = preferencesTab[0].preferences[0]
        const userToShow = await userCRUD.get('*', 'user_id', user_id)
        let pseudo = userToShow[0].pseudo
        let email = userToShow[0].email
        let token = userToShow[0].token
        let role = userToShow[0].role
        const userLogs = await logCRUD.get('*', 'user_id', user_id)
        const betatesterInfo = await betatesterCRUD.get('*', 'user_id', user_id)
        if (!betatesterInfo[0]){
            const templateVars = [ id, preference, user_id, pseudo, email, token, role, userLogs, "null" ]
            res.render('./Templates/AdminDashboard/showuser.html.twig', { templateVars })
        }
        else {
            const templateVars = [ id, preference, user_id, pseudo, email, token, role, userLogs, betatesterInfo[0] ]
            res.render('./Templates/AdminDashboard/showuser.html.twig', { templateVars })
        }
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
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preference = preferencesTab[0].preferences[0]
        const logs = await logCRUD.get()
        const templateVars = [ id, preference, logs ]
        res.render('./Templates/AdminDashboard/logs.html.twig', { templateVars })
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
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preference = preferencesTab[0].preferences[0]
        const contactsForm = await contactCRUD.get()
        const templateVars = [ id, preference, contactsForm ]
        res.render('./Templates/AdminDashboard/formcontact.html.twig', { templateVars })
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
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preference = preferencesTab[0].preferences[0]
        const modeleSQL = "%"+searchrequest+"%"
        const usersSearchAnswer = await userCRUD.get('*', ['pseudo', 'email', 'role'], "", true, modeleSQL, 'OR')
        const templateVars = [id, preference, usersSearchAnswer, usersSearchAnswer.length]
        res.render('./Templates/AdminDashboard/dashboard.html.twig', { templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

module.exports = { homeDashboard, adminCreatUser, adminUpdateUserAccount, adminDeleteUserAccount, showDetailUser, showLogs, showFormcontact, searchUser }