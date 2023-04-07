const query = require("../Utils/query")

const table = 'events_artists'

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
async function create(event_id, artist_id){
    const rows = "(event_id, artist_id)"
    const values = [event_id, artist_id]
    query.insert(rows, table, values)
}


// Update an existing user
async function update(event_artist_id, event_id, artist_id){
    if (event_id != ""){
        query.update('event_id', table, event_id, 'event_artist_id', event_artist_id)
    }
    if (artist_id != ""){
        query.update('artist_id', table, artist_id, 'event_artist_id', event_artist_id)
    }
}

// Delete a user by token selection
async function remove(event_artist_id){
    query.remove(table, 'event_artist_id', event_artist_id)
}


module.exports = { get, create, update, remove }