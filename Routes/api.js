const { getEvents, getEventsByCity, getPlaces, getPlacesByCity, getArtists } = require("../Controllers/api")

function apiRoute(app){
    // User CRUD routing

    app.get('/api/getevents', getEvents)
    app.get('/api/getevents/:event_id', getEvents)
    app.get('/api/getevents/city/:city_id', getEventsByCity)

    app.get('/api/getplaces', getPlaces)
    app.get('/api/getplaces/:place_id', getPlaces)
    app.get('/api/getplaces/city/:city_id', getPlacesByCity)

    app.get('/api/getartists', getArtists)
    app.get('/api/getartists/:artist_id', getArtists)

}

module.exports = apiRoute