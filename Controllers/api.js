const eventCRUD = require("../CRUD/event")
const placeCRUD = require("../CRUD/place")
const artistCRUD = require("../CRUD/artists")
const imageCRUD = require("../CRUD/image")
const externalmediaCRUD = require("../CRUD/external_medias")
const eventsplacesCRUD = require("../CRUD/event_place")
const eventsartistsCRUD = require("../CRUD/event_artist")
const eventsimagesCRUD = require("../CRUD/event_image")
const eventsexternalmediasCRUD = require("../CRUD/event_external_media")

/*
GET /events => Retourne tous les évènements
GET /events/:eventId => Retourne les infos d'un évènement
*/

async function getEvents(req, res){
    if (!req.params.event_id){
        const answer = {"events": []}
        answer.events = await eventCRUD.get()
        for (let i = 0; i < answer.length; i++){
            answer[i].artists = {}
        }
        for (let i = 0; i < answer.length; i++){
            const artists_id = await eventsartistsCRUD.get('artist_id', 'event_id', answer[i].event_id)
            for (let k = 0; k < artists_id.length; k++){
                answer[i].artists[k] = await artistCRUD.get('*', 'artist_id', artists_id[k].artist_id)
            }
        }
        for (let i = 0; i < answer.length; i++){
            answer[i].images = {}
        }
        for (let i = 0; i < answer.length; i++){
            const images_id = await eventsimagesCRUD.get('image_id', 'event_id', answer[i].event_id)
            for (let k = 0; k < images_id.length; k++){
                answer[i].images[k] = await imageCRUD.get('*', 'image_id', images_id[k].image_id)
            }
        }
        for (let i = 0; i < answer.length; i++){
            answer[i].externalmedias = {}
        }
        for (let i = 0; i < answer.length; i++){
            const external_medias_id = await eventsexternalmediasCRUD.get('external_media_id', 'event_id', answer[i].event_id)
            for (let k = 0; k < external_medias_id.length; k++){
                answer[i].externalmedias[k] = await externalmediaCRUD.get('*', 'external_media_id', external_medias_id[k].external_media_id)
            }
        }
        res.json(answer)
    }
    else {
        const answer = await eventCRUD.get("*", "event_id", req.params.event_id)
        answer[0].artists = {}
        const artists_id = await eventsartistsCRUD.get('artist_id', 'event_id', req.params.event_id)
        for (let k = 0; k < artists_id.length; k++){
            answer[0].artists[k] = await artistCRUD.get('*', 'artist_id', artists_id[k].artist_id)
        }
        answer[0].images = {}
        const images_id = await eventsimagesCRUD.get('image_id', 'event_id', req.params.event_id)
        for (let k = 0; k < images_id.length; k++){
            answer[0].images[k] = await imageCRUD.get('*', 'image_id', images_id[k].image_id)
        }
        answer[0].externalmedias = {}
        const external_medias_id = await eventsexternalmediasCRUD.get('external_media_id', 'event_id', req.params.event_id)
        for (let k = 0; k < external_medias_id.length; k++){
            answer[0].externalmedias[k] = await externalmediaCRUD.get('*', 'external_media_id', external_medias_id[k].external_media_id)
        }
        res.json(answer)
    }
}

/*
GET /events/city/:cityId => Retourne tous les évènements d'une ville
*/

async function getEventsByCity(req, res){
    if (!req.params.city_id){
        res.send('aucune ville selectionnée')
    }
    else {
        const answer_placeByCity = await placeCRUD.get('*', 'city_id', req.params.city_id)
        //console.log(answer_placeByCity)
        const tab_eventsplaces = []
        for (let i = 0; i < answer_placeByCity.length; i++){
            tab_eventsplaces[i] = await eventsplacesCRUD.get('*', 'place_id', answer_placeByCity[i].place_id)
        }
        var tab_eventId = []
        var ind = 0
        for (let i = 0; i < tab_eventsplaces.length; i++){
            for(let j = 0; j < tab_eventsplaces[i].length; j++){
                var exist = false
                for (let k = 0; k < tab_eventId.length; k++){
                    if (tab_eventId[k] == tab_eventsplaces[i][j].event_id){
                        exist = true
                    }
                }
                if (!exist){
                    tab_eventId[ind] = tab_eventsplaces[i][j].event_id
                    ind++
                }
            }
        }
        const answer = {}
        for (let i = 1; i < tab_eventId.length; i++){
            answer[i] = await eventCRUD.get('*', 'event_id', tab_eventId[i])
            answer[i][0].artists = {}
            const artists_id = await eventsartistsCRUD.get('artist_id', 'event_id', tab_eventId[i])
            for (let k = 0; k < artists_id.length; k++){
                answer[i][0].artists[k] = await artistCRUD.get('*', 'artist_id', artists_id[k].artist_id)
            }
            answer[i][0].images = {}
            const images_id = await eventsimagesCRUD.get('image_id', 'event_id', tab_eventId[i])
            for (let k = 0; k < images_id.length; k++){
                answer[i][0].images[k] = await imageCRUD.get('*', 'image_id', images_id[k].image_id)
            }
            answer[i][0].externalmedias = {}
            const external_medias_id = await eventsexternalmediasCRUD.get('external_media_id', 'event_id', tab_eventId[i])
            for (let k = 0; k < external_medias_id.length; k++){
                answer[i][0].externalmedias[k] = await externalmediaCRUD.get('*', 'external_media_id', external_medias_id[k].external_media_id)
            }
        }
        res.send(answer)
    }
}

/*
GET /places => Retourne tous les lieux d'évènements
GET /places/:placeId => Retourne les infos d'un lieu
*/

async function getPlaces(req, res){
    if (!req.params.place_id){
        const answer = {"places": []}
        answer.places = await placeCRUD.get()
        res.send(answer)
    }
    else {
        const answer = {"places": []}
        answer.places = await placeCRUD.get("*", "place_id", req.params.place_id)
        res.send(answer)
    }
}

/*
GET /places/city/:cityId => Retourne tous les lieux d'une ville
*/
async function getPlacesByCity(req, res){
    if (!req.params.city_id){
        res.send('aucune ville selectionnée')
    }
    else {
        const answer = {"places": []}
        answer.places = await placeCRUD.get('*', 'city_id', req.params.city_id)
        res.send(answer)
    }
}

/*
GET /artists => Retourne tous les artistes
GET /artists/:artistId => Retourne les infos d'un artiste
*/

async function getArtists(req, res){
    if (!req.params.artist_id){
        const answer = {"artists": []}
        answer.artists = await artistCRUD.get()
        res.send(answer)
    }
    else {
        const answer = {"artists": []}
        answer.artists = await artistCRUD.get("*", "artist_id", req.params.artist_id)
        res.send(answer)
    }
}

module.exports = { getEvents, getEventsByCity, getPlaces, getPlacesByCity, getArtists }