const userCRUD = require("../CRUD/user");
const logCRUD = require("../CRUD/log");
const contactCRUD = require("../CRUD/contact");
const artistCRUD = require("../CRUD/artists");
const cityCRUD = require("../CRUD/city");
const eventCRUD = require("../CRUD/event");
const imageCRUD = require("../CRUD/image");
const placeCRUD = require("../CRUD/place");
const fs = require('fs');
const csv = require('csv-parser');
const mv = require('mv');


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
        templateVars.images = await imageCRUD.get()
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


async function showCSV(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "CSV_show": "aucun contenu",
            "active": "csv",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CSVmanagement/csvmanagement.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function insertCSV(CSV){
    console.log(CSV)
}


async function addCSV(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { csvFile } = req.files
        const { csvType } = req.body
        if (!csvFile) {
            res.send("Aucun CSV trouvé ! ERR00");
        }
        const data = csvFile.data.toString('utf-8')
        const dataTab = data.split("\r\n")
        const dataTitle = "CSV type "+ csvType +" upload validated !"

        //insertCSV(result)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "active": "csv",
            "CSVtitle": dataTitle,
            "CSV_show": dataTab,
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CSVmanagement/csvmanagement.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

module.exports = { homeDashboard, showLogs, showFormcontact, spacruds, showAPI, showCSV, addCSV }