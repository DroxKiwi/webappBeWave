const query = require("../Utils/query")

const table = 'media_platform'

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
async function create(name){
    const rows = "(name)"
    const values = [name]
    query.insert(rows, table, values)
}


// Update an existing user
async function update(media_platform_id, name){
    if (name != ""){
        query.update('name', table, name, 'media_platform_id', media_platform_id)
    }
}

// Delete a user by token selection
async function remove(media_platform_id){
    query.remove(table, 'media_platform_id', media_platform_id)
}


module.exports = { get, create, update, remove }