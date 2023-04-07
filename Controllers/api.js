const artistCRUD = require("../CRUD/artists")

async function getTest(req, res){
    const answer = await artistCRUD.get()
    res.json(answer)
}


async function createTest(req, res){
    const { name, desc, img, extm } = req.body
    const answer = await artistCRUD.create(name, desc, img, extm)
    res.json(answer)
}

async function updateTest(req, res){
    const { artist_id, name, description, image_id, external_media_id } = req.body
    const answer = await artistCRUD.update(artist_id, name, description, image_id, external_media_id)
    res.json(answer)
}

async function removeTest(req, res){
    const { artist_id } = req.body
    const answer = await artistCRUD.remove(artist_id)
    res.json(answer)
}

module.exports = { getTest, createTest, updateTest, removeTest }