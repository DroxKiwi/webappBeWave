const encryptPassword = require("../Utils/encryptPassword")
const query = require("../Utils/query")

const table = 'contacts'

// Get all the users stored into the database and send it to the dashboard
async function get(rows = '*', rowsToCompare = "", valueToCompare = ""){
    if (rowsToCompare == "" && valueToCompare == ""){
        return await query.select(rows, table)    
    }
    else {
        return await query.selectEqual(rows, table, rowsToCompare, valueToCompare)
    }
}

// Creat a new user
async function create(user_id, type, message){
    const rows = "(user_id, type, message)"
    const values = query.prepareValues([user_id, type, message])
    query.insert(rows, table, values)
}


// Update an existing user
async function update(contact_id, user_id, type, message){
    if (user_id != ""){
        query.update('user_id', table, user_id, 'contact_id', contact_id)
    }
    if (type != ""){
        query.update('type', table, type, 'contact_id', contact_id)
    }
    if (message != ""){
        query.update('message', table, message, 'contact_id', contact_id)
    }
}

// Delete a user by token selection
async function remove(contact_id){
    query.remove(table, 'contact_id', contact_id)
}


module.exports = { get, create, update, remove }