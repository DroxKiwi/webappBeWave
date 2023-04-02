const encryptPassword = require("../Utils/encryptPassword")
const pool = require("../Utils/db")
const query = require("../Utils/query")

// Get all the users stored into the database and send it to the dashboard
async function get(){
    // ROLE_ADMIN needed to get users in DB
    pool.query(`SELECT * FROM users`, (error, results) => {
        if (error){
            throw error
        }
        else {
            console.log(results.rows)
            return results.rows
        }
    })
}


// Creat a new user
async function create(pseudo, email, password, role){
    const {token, salt, hash} = encryptPassword(password)
    pool.query(`SELECT pseudo, email FROM users WHERE pseudo = '${pseudo}' OR email = '${email}'`, (error, results) => {
        if (error){
            return error
        }
        else {
            // We check if a user is allready existing with this email or pseudo
            if (!results.rows[0]){
                pool.query(`INSERT INTO users (pseudo, email, token, salt, hash, role, preferences) VALUES ('${pseudo}', '${email}','${token}','${salt}', '${hash}', '${role}', '{"darkmode"}')`, (error) => {
                    if (error) {
                        return error
                    }
                    else {
                        return "User succesfuly created"
                    }
                })
            }
            else {
                return "An account already exist with thoses credentials !"
            }
        }
    })
}


// Update an existing user
async function update(user_id ,pseudo, email, password, role, preferences){
    const {token, salt, hash} = encryptPassword(password)
    pool.query(`UPDATE users SET pseudo = '${pseudo}', email = '${email}', token = '${token}', salt = '${salt}', hash = '${hash}', role = '${role}', preferences = '${preferences}' WHERE user_id = '${user_id}'`, (error) => {
        if (error){
            return error
        }
        else {
            return "User succesfuly updated"
        }
    })
}

// Delete a user by token selection
async function remove(user_id){
    pool.query(`DELETE FROM users WHERE user_id = '${user_id}'`, (errorS) => {
        if (error){
            return error
        }
        else {
            return "User succesfuly deleted"
        }
    })
}


module.exports = { get, create, update, remove }