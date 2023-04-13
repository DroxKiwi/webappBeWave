const logger = require("../Utils/logger")
const artistCRUD = require("../CRUD/artists")
const userCRUD = require("../CRUD/user")
const cityCRUD = require("../CRUD/city")
const eventCRUD = require("../CRUD/event")
const externalMediaCRUD = require("../CRUD/external_medias")
const imageCRUD = require("../CRUD/image")
const MPCRUD = require("../CRUD/mediaplatform")
const placeCRUD = require("../CRUD/place")

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
            "events": await eventCRUD.get()
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
            "author_id": eventToShow[0].author_id,
            "name": eventToShow[0].name,
            "description": eventToShow[0].description,
            "banner_id": eventToShow[0].banner_id,
            "display_map": eventToShow[0].display_map,
            "start_date": start_date,
            "end_date": end_date,
            "price": eventToShow[0].price,
        }
        res.render('./Templates/AdminDashboard/CRUDs/event/showevent.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addEvent(req, res){
    const { name, description, banner_id, display_map, start_date, end_date, price } = req.body
    if (display_map == undefined){
        var display_map_value = false
    }
    else {
        var display_map_value = true
    }
    console.log(display_map_value)
    if (req.role == "ROLE_ADMIN"){
        const answer_user_id = await userCRUD.get("user_id", "pseudo", req.pseudo)
        const user_id = answer_user_id[0].user_id
        await eventCRUD.create(user_id, name, description, banner_id, display_map_value, start_date, end_date, price)
        res.redirect(302, '/showcrudevent')
    }
}

async function deleteEvent(req, res){
    const { event_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        await eventCRUD.remove(event_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "events": await eventCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/event/showcrudevent.html.twig', { ...templateVars })
    }
}

async function updateEvent(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { event_id, author_id, name, description, banner_id, display_map, start_date, end_date, price } = req.body
        if (display_map == undefined){
            var display_map_value = false
        }
        else {
            var display_map_value = true
        }
        const message = "Update an event : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await eventCRUD.update(event_id, author_id, name, description, banner_id, display_map_value, start_date, end_date, price)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "events": await eventCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/event/showcrudevent.html.twig', { ...templateVars })
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
            "path_": imageToShow[0].path_,
            "extension": imageToShow[0].extension
        }
        res.render('./Templates/AdminDashboard/CRUDs/image/showimage.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addImage(req, res){
    const { name, path, extension } = req.body
    if (req.role == "ROLE_ADMIN"){
        await imageCRUD.create(name, path, extension)
        res.redirect(302, '/showcrudimage')
    }
}

async function deleteImage(req, res){
    const { image_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        await imageCRUD.remove(image_id)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "images": await imageCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/image/showcrudimage.html.twig', { ...templateVars })
    }
}

async function updateImage(req, res){
    if (req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { image_id, name, path_, extension } = req.body
        const message = "Update an image : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await imageCRUD.update(image_id, name, path_, extension)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const templateVars = {
            "id": req.pseudo,
            "preference": preferencesTab[0].preferences[0],
            "images": await imageCRUD.get()
        }
        res.render('./Templates/AdminDashboard/CRUDs/image/showcrudimage.html.twig', { ...templateVars })
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

module.exports = { showArtists, showDetailArtist, addArtist, deleteArtist, updateArtist, 
    showCities, showDetailCity, addCity, deleteCity, updateCity,
    showEvents, showDetailEvent, addEvent, deleteEvent, updateEvent,
    showExternalMedias, showDetailExternalMedia, addExternalMedia, deleteExternalMedia, updateExternalMedia,
    showImages, showDetailImage, addImage, deleteImage, updateImage,
    showMPs,showDetailMP, addMP, deleteMP, updateMP,
    showPlaces,showDetailPlace, addPlace, deletePlace, updatePlace }