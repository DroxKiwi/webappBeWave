const query = require("../Utils/query")

const table = 'images'

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
async function create(name, extension){
    const rows = "(name, extension)"
    const values = [name, extension]
    query.insert(rows, table, values)
}


// Update an existing user
async function update(image_id, name, extension){
    if (name != ""){
        query.update('name', table, name, 'image_id', image_id)
    }
    if (extension != ""){
        query.update('extension', table, extension, 'image_id', image_id)
    }
}

// Delete a user by token selection
async function remove(image_id){
    query.remove(table, 'image_id', image_id)
}


module.exports = { get, create, update, remove }