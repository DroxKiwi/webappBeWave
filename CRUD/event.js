const query = require("../Utils/query")

const table = 'events'

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
async function create(author_name, name, description, validated, start_date, end_date, price){
    const rows = "(author_name, name, description, validated, start_date, end_date, price)"
    const values = [author_name, name, description, validated, start_date, end_date, price]
    const answer = query.insert(rows, table, values)
    return answer
}


// Update an existing user
async function update(event_id, author_name, name, description, validated, start_date, end_date, price){
    if (author_name != ""){
        query.update('author_name', table, author_name, 'event_id', event_id)
    }
    if (name != ""){
        query.update('name', table, name, 'event_id', event_id)
    }
    if (description != ""){
        query.update('description', table, description, 'event_id', event_id)
    }
    if (validated != ""){
        query.update('validated', table, validated, 'event_id', event_id)
    }
    if (start_date!= ""){
        query.update('start_date', table, start_date, 'event_id', event_id)
    }
    if (end_date!= ""){
        query.update('end_date', table, end_date, 'event_id', event_id)
    }
    if (price!= ""){
        query.update('price', table, price, 'event_id', event_id)
    }
}

// Delete a user by token selection
async function remove(event_id){
    query.remove(table, 'event_id', event_id)
}


module.exports = { get, create, update, remove }