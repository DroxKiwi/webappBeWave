const query = require("../Utils/query")

const table = 'events_places'

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
async function create(event_id, place_id){
    const rows = "(event_id, place_id)"
    const values = [event_id, place_id]
    query.insert(rows, table, values)
}


// Update an existing user
async function update(event_place_id, event_id, place_id){
    if (event_id != ""){
        query.update('event_id', table, event_id, 'event_place_id', event_place_id)
    }
    if (place_id != ""){
        query.update('place_id', table, place_id, 'event_place_id', event_place_id)
    }
}

// Delete a user by token selection
async function remove(event_place_id){
    query.remove(table, 'event_place_id', event_place_id)
}


module.exports = { get, create, update, remove }