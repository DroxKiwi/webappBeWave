const query = require("../Utils/query")

const table = 'logs'

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
async function create(user_id, user_email, log_message){
    const rows = "(user_id, user_email, log_message)"
    const values = [user_id, user_email, log_message]
    query.insert(rows, table, values)
}


// Update an existing user
async function update(log_id, user_id, user_email, log_message){
    if (user_id != ""){
        query.update('user_id', table, user_id, 'log_id', log_id)
    }
    if (user_email != ""){
        query.update('user_email', table, user_email, 'log_id', log_id)
    }
    if (log_message != ""){
        query.update('log_message', table, log_message, 'log_id', log_id)
    }
}

// Delete a user by token selection
async function remove(log_id){
    query.remove(table, 'log_id', log_id)
}


module.exports = { get, create, update, remove }