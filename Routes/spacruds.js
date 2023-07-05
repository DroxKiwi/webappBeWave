const { search,
    showUsers, showDetailUser, addUser, deleteUser, updateUser, resetPasswordUser,
    showArtists, showDetailArtist, addArtist, deleteArtist, updateArtist,
    showCities, showDetailCity, addCity, deleteCity, updateCity,
    showEvents, showDetailEvent, addEvent, deleteEvent, updateEvent,
    showExternalMedias, showDetailExternalMedia, addExternalMedia, deleteExternalMedia, updateExternalMedia,
    showImages, showDetailImage, addImage, deleteImage, updateImage,
    showMPs,showDetailMP, addMP, deleteMP, updateMP,
    showPlaces,showDetailPlace, addPlace, deletePlace, updatePlace } = require("../Controllers/spacruds")

function crudRoute(app){

    app.post('/search', search)

    app.get('/spauser', showUsers)
    app.post('/showuser', showDetailUser)
    app.post('/adduser', addUser)
    app.post('/deleteuser', deleteUser)
    app.post('/updateuser', updateUser)
    app.post('/resetpassworduser', resetPasswordUser)

    app.get('/spaartist', showArtists)
    app.post('/showartist', showDetailArtist)
    app.post('/addartist', addArtist)
    app.post('/deleteartist', deleteArtist)
    app.post('/updateartist', updateArtist)

    app.get('/spacity', showCities)
    app.post('/showcity', showDetailCity)
    app.post('/addcity', addCity)
    app.post('/deletecity', deleteCity)
    app.post('/updatecity', updateCity)

    app.get('/spaevent', showEvents)
    app.post('/showevent', showDetailEvent)
    app.post('/addevent', addEvent)
    app.post('/deleteevent', deleteEvent)
    app.post('/updateevent', updateEvent)

    app.get('/spaexternalmedia', showExternalMedias)
    app.post('/showexternalmedia', showDetailExternalMedia)
    app.post('/addexternalmedia', addExternalMedia)
    app.post('/deleteexternalmedia', deleteExternalMedia)
    app.post('/updateexternalmedia', updateExternalMedia)

    app.get('/spaimage', showImages)
    app.post('/showimage', showDetailImage)
    app.post('/addimage', addImage)
    app.post('/deleteimage', deleteImage)
    app.post('/updateimage', updateImage)

    app.get('/spamediaplatform', showMPs)
    app.post('/showmediaplatform', showDetailMP)
    app.post('/addmediaplatform', addMP)
    app.post('/deletemediaplatform', deleteMP)
    app.post('/updatemediaplatform', updateMP)

    app.get('/spaplace', showPlaces)
    app.post('/showplace', showDetailPlace)
    app.post('/addplace', addPlace)
    app.post('/deleteplace', deletePlace)
    app.post('/updateplace', updatePlace)

}

module.exports = crudRoute