const userCRUD = require("../CRUD/user")
const logCRUD = require("../CRUD/log")

function createLogMessage(user_role, date, action){
    const log = " : "+user_role+" : "+date+" : "+action
    return log
}

async function newLog(token, action){
    const date = new Date() 
    const answer_user = await userCRUD.get("user_id, email, role", "token", token)
    const user_id = answer_user[0].user_id
    const user_email = answer_user[0].email
    const user_role = answer_user[0].role
    const log_message = createLogMessage(user_role, date, action)
    await logCRUD.create(user_id, user_email, log_message)
}

module.exports = { newLog }