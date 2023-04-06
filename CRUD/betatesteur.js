const encryptPassword = require("../Utils/encryptPassword")
const query = require("../Utils/query")

const table = 'betatesters'

// Get the betatesters stored into the database and send it to the dashboard
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
async function create(user_id, firstname, name, dob, adress, phone){
    const checkUserExistByUserId = await query.selectEqual('user_id', table, 'user_id', user_id)
    const rows = "(user_id, firstname, name, dob, adress, phone)"
    const values = [user_id, firstname, name, dob, adress, phone]
    if (!checkUserExistByUserId[0]){
        query.insert(rows, table, values)
    }
}


// Update an existing user
async function update(batatester_id, user_id, firstname, name, dob, adress, phone){
    if (user_id != ""){
        query.update('user_id', table, user_id, 'batatester_id', batatester_id)
    }
    if (firstname != ""){
        query.update('firstname', table, firstname, 'batatester_id', batatester_id)
    }
    if (name != ""){
        query.update('name', table, name, 'batatester_id', batatester_id)
    }
    if (dob != ""){
        query.update('dob', table, dob, 'batatester_id', batatester_id)
    }
    if (adress != ""){
        query.update('adress', table, adress, 'batatester_id', batatester_id)
    }
    if (phone != ""){
        query.update('phone', table, phone, 'batatester_id', batatester_id)
    }
}

// Delete a user by token selection
async function remove(betatester_id){
    query.remove(table, 'betatester_id', betatester_id)
}


module.exports = { get, create, update, remove }
