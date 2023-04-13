const query = require("../Utils/query")

const table = 'external_medias'

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
async function create(url, media_platform_id){
    const rows = "(url, media_platform_id)"
    const values = [url, media_platform_id]
    query.insert(rows, table, values)
}


// Update an existing user
async function update(external_media_id, url, media_platform_id){
    if (url != ""){
        query.update('url', table, url, 'external_media_id', external_media_id)
    }
    if (media_platform_id != ""){
        query.update('media_platform_id', table, media_platform_id, 'external_media_id', external_media_id)
    }
}

// Delete a user by token selection
async function remove(external_media_id){
    query.remove(table, 'external_media_id', external_media_id)
}


module.exports = { get, create, update, remove }