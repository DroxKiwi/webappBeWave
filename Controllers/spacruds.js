const artistCRUD = require("../CRUD/artists")
const userCRUD = require("../CRUD/user")
const cityCRUD = require("../CRUD/city")
const eventCRUD = require("../CRUD/event")
const imageCRUD = require("../CRUD/image")
const placeCRUD = require("../CRUD/place")
const logCRUD = require("../CRUD/log")
const betatesterCRUD = require("../CRUD/betatesteur")
const eventimageCRUD = require("../CRUD/event_image")
const eventartistCRUD = require("../CRUD/event_artist")
const eventplaceCRUD = require("../CRUD/event_place")
const logger = require("../Utils/logger")
const generateRandomPassword = require ("../Utils/generatePassword")
const fs = require('fs')
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
            "users": await userCRUD.get('*', ['pseudo', 'email', 'role'], "", true, modeleSQL, 'OR'),
            "active": "crud",
            "crud": searchtable,
            "csrfToken": req.csrfToken()
        }
        switch (searchtable) {
            case 'all': 
                templateVars.users = await userCRUD.get('*', ['pseudo', 'email', 'role'], "", true, modeleSQL, 'OR')
                templateVars.artists = await artistCRUD.get('*', ['name'], "", true, modeleSQL, 'OR')
                templateVars.cities = await cityCRUD.get('*', ['name', 'postal_code'], "", true, modeleSQL, 'OR')
                templateVars.events = await eventCRUD.get('*', ['name'], "", true, modeleSQL, 'OR')
                templateVars.images = await imageCRUD.get('*', ['name', 'extension'], "", true, modeleSQL, 'OR')
                templateVars.places = await placeCRUD.get('*', ['name', 'adress'], "", true, modeleSQL, 'OR')
                break
            case 'user':
                templateVars.users = await userCRUD.get('*', ['pseudo', 'email', 'role'], "", true, modeleSQL, 'OR')
                break
            case 'artist':
                templateVars.artists = await artistCRUD.get('*', ['name'], "", true, modeleSQL, 'OR')
                break
            case 'city':
                templateVars.cities = await cityCRUD.get('*', ['name', 'postal_code'], "", true, modeleSQL, 'OR')
                break
            case 'event':
                templateVars.events = await eventCRUD.get('*', ['name'], "", true, modeleSQL, 'OR')
                break
            case 'image':
                templateVars.images = await imageCRUD.get('*', ['name', 'extension'], "", true, modeleSQL, 'OR')
                break
            case 'place':
                templateVars.places = await placeCRUD.get('*', ['name', 'adress'], "", true, modeleSQL, 'OR')
                break
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
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
            "users": await userCRUD.get(),
            "active": "crud",
            "crud": "user",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
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
            "betatesterInfo": await betatesterCRUD.get('*', 'user_id', user_id),
            "active": "crud",
            "crud": "userDetail",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
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
        res.redirect(302, '/spauser')
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
        res.redirect(302, '/spauser')
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
        res.redirect(302, '/spauser')
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
        res.redirect(302, '/spauser')
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
            "artists": await artistCRUD.get(),
            "images": await imageCRUD.get(),
            "active": "crud",
            "crud": "artist",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
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
            "media": artistToShow[0].media,
            "image_id": artistToShow[0].image_id,
            "images": await imageCRUD.get(),
            "active": "crud",
            "crud": "artistDetail",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addArtist(req, res){
    const { name, description, media, image_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await artistCRUD.create(name, description, media, image_id)
        res.redirect(302, '/spaartist')
    }
}

async function deleteArtist(req, res){
    const { artist_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await artistCRUD.remove(artist_id)
        res.redirect(302, '/spaartist')
    }
}

async function updateArtist(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { artist_id, name, description, media, image_id } = req.body
        const message = "Update an artist : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await artistCRUD.update(artist_id, name, description, media, image_id)
        res.redirect(302, '/spaartist')
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
            "cities": await cityCRUD.get(),
            "images": await imageCRUD.get(),
            "active": "crud",
            "crud": "city",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
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
            "image_id": cityToShow[0].image_id,
            "images": await imageCRUD.get(),
            "preference": preferencesTab[0].preferences[0],
            "name": cityToShow[0].name,
            "postcode": cityToShow[0].postal_code,
            "active": "crud",
            "crud": "cityDetail",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addCity(req, res){
    const { name, postalcode, image_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await cityCRUD.create(name, postalcode, image_id)
        res.redirect(302, '/spacity')
    }
}


async function deleteCity(req, res){
    const { city_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await cityCRUD.remove(city_id)
        res.redirect(302, '/spacity')
    }
}

async function updateCity(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { city_id, name, postal_code, image_id } = req.body
        const message = "Update a city : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await cityCRUD.update(city_id, name, postal_code, image_id)
        res.redirect(302, '/spacity')
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
            "events_images": await eventimageCRUD.get(),
            "images": await imageCRUD.get(),
            "events_artists": await eventartistCRUD.get(),
            "artists": await artistCRUD.get(),
            "events_places": await eventplaceCRUD.get(),
            "places": await placeCRUD.get(),
            "active": "crud",
            "crud": "event",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
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
            "validated": eventToShow[0].validated,
            "start_date": start_date,
            "end_date": end_date,
            "price": eventToShow[0].price,
            "images_id": await eventimageCRUD.get('image_id', 'event_id', event_id),
            "images": await imageCRUD.get(),
            "artists_id": await eventartistCRUD.get('artist_id', 'event_id', event_id),
            "artists": await artistCRUD.get(),
            "places_id": await eventplaceCRUD.get('place_id', 'event_id', event_id),
            "places": await placeCRUD.get(),
            "active": "crud",
            "crud": "eventDetail",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}


async function addEvent(req, res){
    const { author_name, name, description, images, artists, places, validated, start_date, end_date, price } = req.body
    if (validated == undefined){
        var validated_value = false
    }
    else {
        var validated_value = true
    }
    if (req.role == "ROLE_ADMIN"){
        var answer_insert;
        if (end_date == ""){
            answer_insert = await eventCRUD.create(author_name, name, description, validated_value, start_date, start_date, price, true)
        }
        else {
            answer_insert = await eventCRUD.create(author_name, name, description, validated_value, start_date, end_date, price, true)
        }
        const event_id_created = answer_insert.rows[0].event_id
        if (images[0] != undefined){
            if (images.length > 1){
                const images_tab = images.split(',')
                for(let i = 0; i < images_tab.length; i++){
                    await eventimageCRUD.create(event_id_created, images_tab[i])
                }
            }
            else {
                await eventimageCRUD.create(event_id_created, images[0])
            }
        }
        if (artists[0] != undefined){
            if (artists.length > 1){
                const artists_tab = artists.split(',')
                for(let i = 0; i < artists_tab.length; i++){
                    await eventartistCRUD.create(event_id_created, artists_tab[i])
                }
            }
            else {
                await eventartistCRUD.create(event_id_created, artists[0])
            }
        }
        if (places[0] != undefined){
            if (places.length > 1){
                const places_tab = places.split(',')
                for(let i = 0; i < places_tab.length; i++){
                    await eventplaceCRUD.create(event_id_created, places_tab[i])
                }
            }
            else {
                await eventplaceCRUD.create(event_id_created, places[0])
            }
        }
        res.redirect(302, '/spaevent')
    }
}

async function deleteEvent(req, res){
    const { event_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const answer_event_image_id = await eventimageCRUD.get("event_image_id", "event_id", event_id)
        for (let i = 0; i < answer_event_image_id.length; i++){
            await eventimageCRUD.remove(answer_event_image_id[i].event_image_id)
        }
        const answer_event_artist_id = await eventartistCRUD.get("event_artist_id", "event_id", event_id)
        for (let i = 0; i < answer_event_artist_id.length; i++){
            await eventartistCRUD.remove(answer_event_artist_id[i].event_artist_id)
        }
        const answer_event_place_id = await eventplaceCRUD.get("event_place_id", "event_id", event_id)
        for (let i = 0; i < answer_event_place_id.length; i++){
            await eventplaceCRUD.remove(answer_event_place_id[i].event_place_id)
        }
        await eventCRUD.remove(event_id)
        res.redirect(302, '/spaevent')
    }
}

async function updateEvent(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { event_id, author_id, name, description, images, artists, places, validated, start_date, end_date, price } = req.body
        if (validated == undefined){
            var validated_value = false
        }
        else {
            var validated_value = true
        }
        await eventCRUD.update(event_id, author_id, name, description, validated_value, start_date, end_date, price)
        // Update images link to the event selected for update
        const answer_event_image_id = await eventimageCRUD.get("event_image_id", "event_id", event_id)
        for (let i = 0; i < answer_event_image_id.length; i++){
            await eventimageCRUD.remove(answer_event_image_id[i].event_image_id)
        }
        if (images[0] != undefined){
            if (images.length > 1){
                const images_tab = images.split(',')
                for(let i = 0; i < images_tab.length; i++){
                    await eventimageCRUD.create(event_id, images_tab[i])
                }
            }
            else {
                await eventimageCRUD.create(event_id, images[0])
            }
        }
        //for(let i = 0; i < images.length; i++){
        //    await eventimageCRUD.create(event_id, images[i])
        //}
        // Update artists link to the event selected for update
        const answer_event_artist_id = await eventartistCRUD.get("event_artist_id", "event_id", event_id)
        for (let i = 0; i < answer_event_artist_id.length; i++){
            await eventartistCRUD.remove(answer_event_artist_id[i].event_artist_id)
        }
        if (artists[0] != undefined){
            if (artists.length > 1){
                const artists_tab = artists.split(',')
                for(let i = 0; i < artists_tab.length; i++){
                    await eventartistCRUD.create(event_id, artists_tab[i])
                }
            }
            else {
                await eventartistCRUD.create(event_id, artists[0])
            }
        }
        //for(let i = 0; i < artists.length; i++){
        //    await eventartistCRUD.create(event_id, artists[i])
        //}
        // Update places link to the event selected for update
        const answer_event_place_id = await eventplaceCRUD.get("event_place_id", "event_id", event_id)
        for (let i = 0; i < answer_event_place_id.length; i++){
            await eventplaceCRUD.remove(answer_event_place_id[i].event_place_id)
        }
        if (places[0] != undefined){
            if (places.length > 1){
                const places_tab = places.split(',')
                for(let i = 0; i < places_tab.length; i++){
                    await eventplaceCRUD.create(event_id, places_tab[i])
                }
            }
            else {
                await eventplaceCRUD.create(event_id, places[0])
            }
        }
        //for(let i = 0; i < places.length; i++){
        //    await eventplaceCRUD.create(event_id, places[i])
        //}
        const message = "Update an event : "+name
        logger.newLog(req.cookies.userToken.token, message)
        res.redirect(302, '/spaevent')
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
            "images": await imageCRUD.get(),
            "active": "crud",
            "crud": "image",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
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
            "extension": imageToShow[0].extension,
            "imageType": imageToShow[0].imageType,
            "data": imageToShow[0].data,
            "active": "crud",
            "crud": "imageDetail",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addImage(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { image } = req.files
        if (!image) {
            res.send("Aucune image trouvée ! ERR00");
        }
        if (!(/^image/.test(image.mimetype))) {
            res.send("Ce n'est pas un format acceptable ! ERR01");
        }
        const answer_imgname_exist = await imageCRUD.get('*', 'name', image.name)
        if (answer_imgname_exist[0]){
            res.send("Une image avec un nom identique existe déjà ! ERR02")
        }
        else {
            const ext = '.'+image.name.split('.')[1]
            const name = image.name.split('.')[0]
            const toPreventWebShell = name+ext
            console.log(ext)
            if ((ext != ".png") && (ext != ".jpeg") && (ext != ".jpg")) {
                res.send("Ce n'est pas un format acceptable ! ERR03");
            }
            else {
                await image.mv('./Public/Uploads/images/' + toPreventWebShell);
                const imageBuffer = fs.readFileSync('./Public/Uploads/images/' + toPreventWebShell);
                var imageType;
                if (ext == "png"){
                    imageType = "image/png"
                }
                else if (ext == "jpg"){
                    imageType = "image/jpg"
                }
                else if (ext == "jpeg"){
                    imageType = "image/jpeg"
                }
                const data = imageBuffer.toString('base64');
                await imageCRUD.create(name, ext, imageType, data);
            }
            res.redirect(302, '/spaimage')
        }
    }
    else {
        res.redirect(302, '/login')
    }
}

async function deleteImage(req, res){
    const { image_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        const answer_eventsImage = await eventimageCRUD.get('*', 'image_id', image_id)
        const answer_places = await placeCRUD.get('*', 'image_id', image_id)
        const answer_artists = await artistCRUD.get('*', 'image_id', image_id)
        if (answer_places[0]){
            res.send("Des places sont liées à cette image ! Impossible de supprimer l'image")
        }
        else if (answer_eventsImage[0]){
            res.send("Des evenements sont liées à cette image ! Impossible de supprimer l'image")
        }
        else if (answer_artists[0]){
            res.send("Des artistes sont liées à cette image ! Impossible de supprimer l'image")
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
            res.redirect(302, '/spaimage')
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
        res.redirect(302, '/spaimage')
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
            "places": await placeCRUD.get(),
            "cities": await cityCRUD.get(),
            "images": await imageCRUD.get(),
            "active": "crud",
            "crud": "place",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
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
            "city_id": placeToShow[0].city_id,
            "cities": await cityCRUD.get(),
            "images": await imageCRUD.get(),
            "active": "crud",
            "crud": "placeDetail",
            "csrfToken": req.csrfToken()
        }
        res.render('./Templates/AdminDashboard/CRUDs/spacruds.html.twig', { ...templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function addPlace(req, res){
    const { name, description, adress, image_id, city_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await placeCRUD.create(name, description, adress, image_id, city_id)
        res.redirect(302, '/spaplace')
    }
}

async function deletePlace(req, res){
    const { place_id } = req.body
    if (req.role == "ROLE_ADMIN"){
        await placeCRUD.remove(place_id)
        res.redirect(302, '/spaplace')
    }
}

async function updatePlace(req, res){
    if (req.role == "ROLE_ADMIN"){
        const { place_id, name, description, adress, image_id, city_id } = req.body
        const message = "Update a place : "+name
        logger.newLog(req.cookies.userToken.token, message)
        await placeCRUD.update(place_id, name, description, adress, image_id, city_id)
        res.redirect(302, '/spaplace')
    }
}

module.exports = { search,
    showUsers, showDetailUser, addUser, deleteUser, updateUser, resetPasswordUser,
    showArtists, showDetailArtist, addArtist, deleteArtist, updateArtist,
    showCities, showDetailCity, addCity, deleteCity, updateCity,
    showEvents, showDetailEvent, addEvent, deleteEvent, updateEvent,
    showImages, showDetailImage, addImage, deleteImage, updateImage,
    showPlaces,showDetailPlace, addPlace, deletePlace, updatePlace }