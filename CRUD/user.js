const encryptPassword = require("../Utils/encryptPassword")
const query = require("../Utils/query")

const table = 'users'

// Get all the users stored into the database and send it to the dashboard
async function get(rows = '*'){
    return await query.select(rows, table)    
}

// Creat a new user
async function create(pseudo, email, password, role){
    const {token, salt, hash} = encryptPassword(password)
    const checkUserExistByEmail = await query.selectEqual('email', table, 'email', "'"+email+"'")
    const checkUserExistByPseudo = await query.selectEqual('pseudo', table, 'pseudo', "'"+pseudo+"'")
    const rows = "(pseudo, email, token, salt, hash, role, preferences)"
    const preferences = '{"darkmode"}'
    const values = query.prepareValues([pseudo, email, token, salt, hash, role, preferences])
    if (!checkUserExistByEmail[0] && !checkUserExistByPseudo[0]){
        query.insert(rows, table, values)
    }
}


// Update an existing user
async function update(user_id, pseudo, email, password, role, preferences){
    if (pseudo != ""){
        query.update('pseudo', table, pseudo, 'user_id', user_id)
    }
    if (email != ""){
        query.update('email', table, email, 'user_id', user_id)
    }
    if (password != ""){
        const {token, salt, hash} = encryptPassword(password)
        query.update('token', table, token, 'user_id', user_id)
        query.update('salt', table, salt, 'user_id', user_id)
        query.update('hash', table, hash, 'user_id', user_id)
    }
    if (role != ""){
        query.update('role', table, role, 'user_id', user_id)
    }
    if (preferences != ""){
        query.update('preferences[0]', table, preferences, 'user_id', user_id)
    }
}

// Delete a user by token selection
async function remove(user_id){
    query.remove(table, 'user_id', user_id)
}


module.exports = { get, create, update, remove }