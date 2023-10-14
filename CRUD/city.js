const query = require("../Utils/query")

const table = 'cities'

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
async function create(name, postal_code, image_id){
    const rows = "(name, postal_code, image_id)"
    const values = [name, postal_code, image_id]
    query.insert(rows, table, values)
}


// Update an existing user
async function update(city_id, name, postal_code, image_id){
    if (name != ""){
        query.update('name', table, name, 'city_id', city_id)
    }
    if (postal_code != ""){
        query.update('postal_code', table, postal_code, 'city_id', city_id)
    }
    if (image_id != ""){
        query.update('image_id', table, image_id, 'city_id', city_id)
    }
}

// Delete a user by token selection
async function remove(city_id){
    query.remove(table, 'city_id', city_id  )
}


module.exports = { get, create, update, remove }