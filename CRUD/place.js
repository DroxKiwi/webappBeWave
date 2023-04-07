const query = require("../Utils/query")

const table = 'places'

// Get the logs stored into the database and send it to the dashboard
// This function can call the LIKE parameter and SQL operator (OR, AND, NOT)
async function get(rows = '*', rowsToCompare = "", valueToCompare = "", operatorLike = false, model, operator = ""){
    if (operatorLike){
        if (operator == ""){
            return await query.selectLike(rows, table, rowsToCompare, valueToCompare)
        }
        else{
            return await query.selectLike('*', table, rowsToCompare, "", true, model, operator)
        }
    }
    if (rowsToCompare == "" && valueToCompare == ""){
        return await query.select(rows, table)
    }
    else {
        return await query.selectEqual(rows, table, rowsToCompare, valueToCompare)
    }
}

// Creat a new user
async function create(name, description, adress, image_id, external_media_id, city_id){
    const rows = "(name, description, adress, image_id, external_media_id, city_id)"
    const values = [name, description, adress, image_id, external_media_id, city_id]
    query.insert(rows, table, values)
}


// Update an existing user
async function update(place_id, name, description, adress, image_id, external_media_id, city_id){
    if (name != ""){
        query.update('name', table, name, 'place_id', place_id)
    }
    if (description != ""){
        query.update('description', table, description, 'place_id', place_id)
    }
    if (adress != ""){
        query.update('adress', table, adress, 'place_id', place_id)
    }
    if (image_id != ""){
        query.update('image_id', table, image_id, 'place_id', place_id)
    }
    if (external_media_id != ""){
        query.update('external_media_id', table, external_media_id, 'place_id', place_id)
    }
    if (city_id != ""){
        query.update('city_id', table, city_id, 'place_id', place_id)
    }
}

// Delete a user by token selection
async function remove(place_id){
    query.remove(table, 'place_id', place_id)
}


module.exports = { get, create, update, remove }