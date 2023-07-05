const userCRUD = require("../CRUD/user")
const logCRUD = require("../CRUD/log")
const contactCRUD = require("../CRUD/contact")
const artistCRUD = require("../CRUD/artists")
const cityCRUD = require("../CRUD/city")
const eventCRUD = require("../CRUD/event")
const externalMediaCRUD = require("../CRUD/external_medias")
const imageCRUD = require("../CRUD/image")
const MPCRUD = require("../CRUD/mediaplatform")
const placeCRUD = require("../CRUD/place")

// Landing page of dashboard
async function homeDashboard(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        // We send the preferences to the twig template 
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "userList": await userCRUD.get(),
            "active": "home"
        }
        res.render('./Templates/AdminDashboard/dashboard.html.twig', { ...templateVars })
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
            "logsList": await logCRUD.get(),
            "active": "log"
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
            "forms": await contactCRUD.get(),
            "active": "contact"
        }
        res.render('./Templates/AdminDashboard/formcontact.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function spacruds(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "active": "crud",
            "crud": "all"
        }
        templateVars.users = await userCRUD.get()
        templateVars.artists = await artistCRUD.get()
        templateVars.cities = await cityCRUD.get()
        templateVars.events = await eventCRUD.get()
        templateVars.external_medias = await externalMediaCRUD.get()
        templateVars.images = await imageCRUD.get()
        templateVars.media_platforms = await MPCRUD.get()
        templateVars.places = await placeCRUD.get()
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}


async function showAPI(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "active": "api"
        }
        res.render('./Templates/AdminDashboard/API/showapi.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

module.exports = { homeDashboard, showLogs, showFormcontact, spacruds, showAPI }