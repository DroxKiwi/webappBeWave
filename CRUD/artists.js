const query = require("../Utils/query")

const table = 'artists'

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

async function create(name, description, image_id){
    const rows = "(name, description, image_id)"
    const values = [name, description, image_id]
    query.insert(rows, table, values)
}


async function update(artist_id, name, description, image_id){
    if (name != ""){
        query.update('name', table, name, 'artist_id', artist_id)
    }
    if (description != ""){
        query.update('description', table, description, 'artist_id', artist_id)
    }
    if (image_id != ""){
        query.update('image_id', table, image_id, 'artist_id', artist_id)
    }
}

async function remove(artist_id){
    query.remove(table, 'artist_id', artist_id)
}


module.exports = { get, create, update, remove }