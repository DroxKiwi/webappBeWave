const artistCRUD = require("../CRUD/artists")
const userCRUD = require("../CRUD/user")
const cityCRUD = require("../CRUD/city")
const eventCRUD = require("../CRUD/event")
const externalMediaCRUD = require("../CRUD/external_medias")
const imageCRUD = require("../CRUD/image")
const MPCRUD = require("../CRUD/mediaplatform")
const placeCRUD = require("../CRUD/place")
const logCRUD = require("../CRUD/log")
const betatesterCRUD = require("../CRUD/betatesteur")
const eventimageCRUD = require("../CRUD/event_image")
const logger = require("../Utils/logger")
const generateRandomPassword = require ("../Utils/generatePassword")
const fs = require('fs')
const path = require('path')
const easyimg = require('easyimage')


// Return the search request made
async function search(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { searchtable } = req.body
        const { searchrequest } = req.body
        const modeleSQL = "%"+searchrequest+"%"
        // Here we are managing the search bar request 
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "users": await userCRUD.get('*', ['pseudo', 'email', 'role'], "", true, modeleSQL, 'OR')
        }
        switch (searchtable) {
            case 'user':
                templateVars.users = await userCRUD.get('*', ['pseudo', 'email', 'role'], "", true, modeleSQL, 'OR')
                res.render('./Templates/AdminDashboard/CRUDs/user/showcruduser.html.twig', { ...templateVars })
                break
            case 'artist':
                templateVars.artists = await artistCRUD.get('*', ['name'], "", true, modeleSQL, 'OR')
                res.render('./Templates/AdminDashboard/CRUDs/artist/showcrudartist.html.twig', { ...templateVars })
                break
            case 'city':
                templateVars.cities = await cityCRUD.get('*', ['name', 'postal_code'], "", true, modeleSQL, 'OR')
                res.render('./Templates/AdminDashboard/CRUDs/city/showcrudcity.html.twig', { ...templateVars })
                break
            case 'event':
                templateVars.events = await eventCRUD.get('*', ['name'], "", true, modeleSQL, 'OR')
                res.render('./Templates/AdminDashboard/CRUDs/event/showcrudevent.html.twig', { ...templateVars })
                break
            case 'external_media':
                templateVars.external_medias = await externalMediaCRUD.get('*', ['url'], "", true, modeleSQL, 'OR')
                res.render('./Templates/AdminDashboard/CRUDs/externalmedia/showcrudexternalmedia.html.twig', { ...templateVars })
                break
            case 'image':
                templateVars.images = await imageCRUD.get('*', ['name', 'extension'], "", true, modeleSQL, 'OR')
                res.render('./Templates/AdminDashboard/CRUDs/image/showcrudimage.html.twig', { ...templateVars })
                break
            case 'mp':
                templateVars.MPs = await MPCRUD.get('*', ['name'], "", true, modeleSQL, 'OR')
                res.render('./Templates/AdminDashboard/CRUDs/mediaplatform/showcrudmediaplatform.html.twig', { ...templateVars })
                break
            case 'place':
                templateVars.places = await placeCRUD.get('*', ['name', 'adress'], "", true, modeleSQL, 'OR')
                res.render('./Templates/AdminDashboard/CRUDs/place/showcrudplace.html.twig', { ...templateVars })
                break
        }
    }
    else {
        res.redirect(302, '/')
    }
}

// Management of users 


// Landing page of dashboard
async function showUsers(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        // We send the preferences to the twig template 
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "users": await userCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/user/showcruduser.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
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
        res.render('./Templates/AdminDashboard/CRUDs/user/showuser.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}


// Create an user from dashboard
async function addUser(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { pseudo, email, password, role } = req.body
        const message = "Create a user -> pseudo : "+pseudo+", email : "+email+", role : "+role
        logger.newLog(req.cookies.userToken.token, message)
        await userCRUD.create(pseudo, email, password, role)
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        // We send the preferences to the twig template 
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "userList": await userCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/user/showcruduser.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function deleteUser(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { user_id } = req.body
        const email = await userCRUD.get('email', 'user_id', user_id)
        message = "Delete an user : "+email
        logger.newLog(req.cookies.userToken.token, message)
        userCRUD.remove(user_id)
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        // We send the preferences to the twig template 
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "userList": await userCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/user/showcruduser.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function updateUser(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { pseudo, email, password, role, user_id } = req.body
        // Here we are updating an user giving by his user_id. Only Admin can do that
        // To make a difference between an update of his own account or the update of an user account, I implement a value nonselfupdate
        const message = "Update a user : "+pseudo 
        logger.newLog(req.cookies.userToken.token, message)
        await userCRUD.update(user_id, pseudo, email, password, role)
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        // We send the preferences to the twig template 
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "userList": await userCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/user/showcruduser.html.twig', { ...templateVars })
        }
    else {
        res.redirect(302, '/')
    }
}

async function resetPasswordUser(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { user_id } = req.body
        const length = 10
        const password = generateRandomPassword(length)
        const answer_user_pseudo = await userCRUD.get('pseudo', 'user_id', user_id)
        const pseudo = answer_user_pseudo[0].pseudo
        message = "Reset a password for : "+pseudo+" new password : "+password
        logger.newLog(req.cookies.userToken.token, message)
        await userCRUD.update(user_id, '', '', password, '', '')
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        // We send the preferences to the twig template 
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "userList": await userCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/user/showcruduser.html.twig', { ...templateVars })
    }
}


// Management Artist
async function showArtists(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "artists": await artistCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/artist/showcrudartist.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function showDetailArtist(req, res){
    const { artist_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const artistToShow = await artistCRUD.get('*', 'artist_id', artist_id)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "artist_id": artist_id,
            "name": artistToShow[0].name,
            "description": artistToShow[0].description,
            "image_id": artistToShow[0].image_id,
            "external_media_id": artistToShow[0].external_media_id
        }
        res.render('./Templates/AdminDashboard/CRUDs/artist/showartist.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addArtist(req, res){
    const { name, description, image_id, external_media_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await artistCRUD.create(name, description, image_id, external_media_id)
        res.redirect(302, '/showcrudartist')
    }
}

async function deleteArtist(req, res){
    const { artist_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        await artistCRUD.remove(artist_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "artists": await artistCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/artist/showcrudartist.html.twig', { ...templateVars })
    }
}

async function updateArtist(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { artist_id, name, description, image_id, external_media_id } = req.body
        const message = "Update an artist : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await artistCRUD.update(artist_id, name, description, image_id, external_media_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "artists": await artistCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/artist/showcrudartist.html.twig', { ...templateVars })
    }
}

// Management City

async function showCities(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "cities": await cityCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/city/showcrudcity.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function showDetailCity(req, res){
    const { city_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const cityToShow = await cityCRUD.get('*', 'city_id', city_id)
        const templateVars = {
            "id": req.pseudo,
            "city_id": city_id,
            "preference": preferencesTab[0].preferences[0],
            "name": cityToShow[0].name,
            "postcode": cityToShow[0].postal_code
        }
        res.render('./Templates/AdminDashboard/CRUDs/city/showcity.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addCity(req, res){
    const { name, postalcode } = req.body
    if (req.role == "ROLE_ADMIN"){
        await cityCRUD.create(name, postalcode)
        res.redirect(302, '/showcrudcity')
    }
}


async function deleteCity(req, res){
    const { city_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        await cityCRUD.remove(city_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "cities": await cityCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/city/showcrudcity.html.twig', { ...templateVars })
    }
}

async function updateCity(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { city_id, name, postal_code } = req.body
        const message = "Update a city : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await cityCRUD.update(city_id, name, postal_code)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "cities": await cityCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/city/showcrudcity.html.twig', { ...templateVars })
    }
}

// Management event

async function showEvents(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "events": await eventCRUD.get(),
            "images": await imageCRUD.get(),
            "events_images": await eventimageCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/event/showcrudevent.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function showDetailEvent(req, res){
    const { event_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const eventToShow = await eventCRUD.get('*', 'event_id', event_id)
        const sdnf = eventToShow[0].start_date
        const ednf = eventToShow[0].end_date
        // Those conditions allowed to format the date before sending it to the dashboard
        let start_date = ""
        let end_date = ""
        if (sdnf.getMonth() > 9){
            start_date = sdnf.getFullYear().toString()+'-'+sdnf.getMonth().toString()+'-'+sdnf.getDate().toString()
        }
        else {
            start_date = sdnf.getFullYear().toString()+'-0'+sdnf.getMonth().toString()+'-'+sdnf.getDate().toString()
        }
        if (ednf.getMonth() > 9){
            end_date = ednf.getFullYear().toString()+'-'+ednf.getMonth().toString()+'-'+ednf.getDate().toString()
        }
        else {
            end_date = ednf.getFullYear().toString()+'-0'+ednf.getMonth().toString()+'-'+ednf.getDate().toString()
        }
        //console.log(sdnf.getFullYear(), sdnf.getDate(), sdnf.getMonth())
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "event_id": event_id,
            "author_name": eventToShow[0].author_name,
            "name": eventToShow[0].name,
            "description": eventToShow[0].description,
            "display_map": eventToShow[0].display_map,
            "start_date": start_date,
            "end_date": end_date,
            "price": eventToShow[0].price,
            "images_id": await eventimageCRUD.get('image_id', 'event_id', event_id),
            "images": await imageCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/event/showevent.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}


async function addEvent(req, res){
    const { author_name, name, description, images, display_map, start_date, end_date, price } = req.body
    if (display_map == undefined){
        var display_map_value = false
    }
    else {
        var display_map_value = true
    }
    if (req.role == "ROLE_ADMIN"){
        const answer_insert = await eventCRUD.create(author_name, name, description, display_map_value, start_date, end_date, price, true)
        const event_id_created = answer_insert.rows[0].event_id
        for(let i = 0; i < images.length; i++){
            await eventimageCRUD.create(event_id_created, images[i])
        }
        res.redirect(302, '/showcrudevent')
    }
}

async function deleteEvent(req, res){
    const { event_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const answer_event_image_id = await eventimageCRUD.get("event_image_id", "event_id", event_id)
        for (let i = 0; i < answer_event_image_id.length; i++){
            await eventimageCRUD.remove(answer_event_image_id[i].event_image_id)
        }
        await eventCRUD.remove(event_id)
        res.redirect(302, '/showcrudevent')
    }
}

async function updateEvent(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { event_id, author_id, name, description, images, display_map, start_date, end_date, price } = req.body
        if (display_map == undefined){
            var display_map_value = false
        }
        else {
            var display_map_value = true
        }
        await eventCRUD.update(event_id, author_id, name, description, display_map_value, start_date, end_date, price)
        const answer_event_image_id = await eventimageCRUD.get("event_image_id", "event_id", event_id)
        for (let i = 0; i < answer_event_image_id.length; i++){
            await eventimageCRUD.remove(answer_event_image_id[i].event_image_id)
        }
        for(let i = 0; i < images.length; i++){
            await eventimageCRUD.create(event_id, images[i])
        }
        const message = "Update an event : "+name
        logger.newLog(req.cookies.userToken.token, message)
        res.redirect(302, '/showcrudevent')
    }
}

// Management External medias

async function showExternalMedias(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "external_medias": await externalMediaCRUD.get()
        }
        for (let i = 0; i < templateVars.external_medias.length; i++){
            if (templateVars.external_medias[i].media_platform_id != null){
                var temp_answer = await MPCRUD.get('name', 'media_platform_id', templateVars.external_medias[i].media_platform_id)
                templateVars.external_medias[i].media_platform_name = temp_answer[0].name
            }
        }
        res.render('./Templates/AdminDashboard/CRUDs/externalmedia/showcrudexternalmedia.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function showDetailExternalMedia(req, res){
    const { external_media_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const externalMediaToShow = await externalMediaCRUD.get('*', 'external_media_id', external_media_id)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "external_media_id": externalMediaToShow[0].external_media_id,
            "url": externalMediaToShow[0].url,
            "media_platform_id": externalMediaToShow[0].media_platform_id
        }
        res.render('./Templates/AdminDashboard/CRUDs/externalmedia/showexternalmedia.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addExternalMedia(req, res){
    const { url, media_platform_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await externalMediaCRUD.create(url, media_platform_id)
        res.redirect(302, '/showcrudexternalmedia')
    }
}

async function deleteExternalMedia(req, res){
    const { external_media_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        await externalMediaCRUD.remove(external_media_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "external_medias": await externalMediaCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/externalmedia/showcrudexternalmedia.html.twig', { ...templateVars })
    }
}

async function updateExternalMedia(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { external_media_id, url, media_platform_id } = req.body
        const message = "Update an artist : "+url
        logger.newLog(req.cookies.userToken.token, message)
        await externalMediaCRUD.update(external_media_id, url, media_platform_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "external_medias": await externalMediaCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/externalmedia/showcrudexternalmedia.html.twig', { ...templateVars })
    }
}

// Management images

async function showImages(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "images": await imageCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/image/showcrudimage.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function showDetailImage(req, res){
    const { image_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const imageToShow = await imageCRUD.get('*', 'image_id', image_id)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "image_id": imageToShow[0].image_id,
            "name": imageToShow[0].name,
            "extension": imageToShow[0].extension
        }
        res.render('./Templates/AdminDashboard/CRUDs/image/showimage.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addImage(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { image } = req.files
        if (!image) {
            res.send("Ce n'est pas une image !");
        }
        if (!(/^image/.test(image.mimetype))) {
            res.send("Ce n'est pas un format acceptable !");
        }
        const answer_imgname_exist = await imageCRUD.get('*', 'name', image.name)
        if (answer_imgname_exist[0]){
            res.send("Une image avec un nom identique existe déjà !")
        }
        else {
            image.mv('./Public/Uploads/' + image.name)
            const ext = '.'+image.name.split('.')[1]
            const name = image.name.split('.')[0]
            await imageCRUD.create(name, ext)
            res.redirect(302, '/showcrudimage')
        }
    }
    else {
        res.redirect(302, '/login')
    }
}

async function deleteImage(req, res){
    const { image_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const answer_events = await eventCRUD.get('*', 'banner_id', image_id)
        const answer_places = await placesCRUD.get('*', 'image_id', image_id)
        if (answer_places[0]){
            res.send("Des places sont liées à cette image ! Impossible de supprimer l'image")
        }
        if (answer_events[0]){
            res.send("Des evenements sont liées à cette image ! Impossible de supprimer l'image")
        }
        else {
            try {
                await imageCRUD.remove(image_id)
            }
            catch(err){
                throw err
            }
            const answer_name = await imageCRUD.get('*', 'image_id', image_id)
            const name = answer_name[0].name
            const ext = answer_name[0].extension
            const filePath = './Public/Uploads/'+name+ext
            fs.unlinkSync(filePath)
            res.redirect(302, '/showcrudimage')
        }
    }
}

async function updateImage(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { image_id, oldname, name, oldext, extension } = req.body
        if (oldext != extension){
            const tmp_path = './Public/Uploads/'+oldname+oldext
            const tmp_extless = tmp_path.replace(oldext,extension)
            await easyimg.convert({src: tmp_path, dst: tmp_extless, quality: 100}, (error) => { 
                if(error){
                    throw error
                }
            })
            fs.unlinkSync('./Public/Uploads/'+oldname+oldext)
        }
        if (oldname != name){
            fs.copyFile('./Public/Uploads/'+oldname+extension, './Public/Uploads/'+name+extension, 
            (error) => {
                if (error) {
                    throw error
                }
            })
            fs.unlinkSync('./Public/Uploads/'+oldname+extension)
        }
        const message = "Update an image : "+name+extension
        logger.newLog(req.cookies.userToken.token, message)
        await imageCRUD.update(image_id, name, extension)
        res.redirect(302, '/showcrudimage')
    }
}


// Management media platform

async function showMPs(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "MPs": await MPCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/mediaplatform/showcrudmediaplatform.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function showDetailMP(req, res){
    const { media_platform_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const MPToShow = await MPCRUD.get('*', 'media_platform_id', media_platform_id)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "media_platform_id": MPToShow[0].media_platform_id,
            "name": MPToShow[0].name
        }
        res.render('./Templates/AdminDashboard/CRUDs/mediaplatform/showmediaplatform.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addMP(req, res){
    const { name } = req.body
    if (req.role == "ROLE_ADMIN"){
        await MPCRUD.create(name)
        res.redirect(302, '/showcrudmediaplatform')
    }
}

async function deleteMP(req, res){
    const { media_platform_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const answer_external_media = await externalmediaCRUD.get('*', 'media_platform_id', media_platform_id)
        if (answer_external_media[0]){
            res.send("Des media externes sont liés à cette plateform de média ! Impossible de supprimer la plateform de média")
        }
        const userToken = req.cookies.userToken.token
        await MPCRUD.remove(media_platform_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "MPs": await MPCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/mediaplatform/showcrudmediaplatform.html.twig', { ...templateVars })
    }
}

async function updateMP(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { media_platform_id, name } = req.body
        const message = "Update an image : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await MPCRUD.update(media_platform_id, name)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "MPs": await MPCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/mediaplatform/showcrudmediaplatform.html.twig', { ...templateVars })
    }
}

// Management place

async function showPlaces(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "places": await placeCRUD.get()
        }
        for (let i = 0; i < templateVars.events.length; i++){
            var temp_answer = await imageCRUD.get("name, extension", "image_id", templateVars.events[i].banner_id)
            templateVars.events[i].image_fullname = temp_answer[0].name + temp_answer[0].extension
        }
        res.render('./Templates/AdminDashboard/CRUDs/place/showcrudplace.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, "/")
    }
}

async function showDetailPlace(req, res){
    const { place_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const placeToShow = await placeCRUD.get('*', 'place_id', place_id)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "place_id": placeToShow[0].place_id,
            "name": placeToShow[0].name,
            "description": placeToShow[0].description,
            "adress": placeToShow[0].adress,
            "image_id": placeToShow[0].image_id,
            "external_media_id": placeToShow[0].external_media_id,
            "city_id": placeToShow[0].city_id
        }
        res.render('./Templates/AdminDashboard/CRUDs/place/showplace.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addPlace(req, res){
    const { name, description, adress, image_id, external_media_id, city_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await placeCRUD.create(name, description, adress, image_id, external_media_id, city_id)
        res.redirect(302, '/showcrudplace')
    }
}

async function deletePlace(req, res){
    const { place_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        await placeCRUD.remove(place_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "places": await placeCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/place/showcrudplace.html.twig', { ...templateVars })
    }
}

async function updatePlace(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { place_id, name, description, adress, image_id, external_media_id, city_id } = req.body
        const message = "Update an image : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await placeCRUD.update(place_id, name, description, adress, image_id, external_media_id, city_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "places": await placeCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/place/showcrudplace.html.twig', { ...templateVars })
    }
}

module.exports = { search,
    showUsers, showDetailUser, addUser, deleteUser, updateUser, resetPasswordUser,
    showArtists, showDetailArtist, addArtist, deleteArtist, updateArtist,
    showCities, showDetailCity, addCity, deleteCity, updateCity,
    showEvents, showDetailEvent, addEvent, deleteEvent, updateEvent,
    showExternalMedias, showDetailExternalMedia, addExternalMedia, deleteExternalMedia, updateExternalMedia,
    showImages, showDetailImage, addImage, deleteImage, updateImage,
    showMPs,showDetailMP, addMP, deleteMP, updateMP,
    showPlaces,showDetailPlace, addPlace, deletePlace, updatePlace }