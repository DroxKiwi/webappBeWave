const cityCRUD = require("../CRUD/city")

async function getTest(req, res){
    const answer = await cityCRUD.get()
    res.json(answer)
}

async function createTest(req, res){
    const { name, postcode } = req.body
    const answer = await cityCRUD.create(name, postcode)
    res.json(answer)
}

async function updateTest(req, res){
    const { city_id, name, postcode } = req.body
    const answer = await artistCRUD.update(city_id, name, postcode)
    res.json(answer)
}

async function removeTest(req, res){
    const { city_id } = req.body
    const answer = await artistCRUD.remove(city_id)
    res.json(answer)
}

module.exports = { getTest, createTest, updateTest, removeTest }