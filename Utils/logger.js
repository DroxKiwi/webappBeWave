const userCRUD = require("../CRUD/user")
const logCRUD = require("../CRUD/log")

/**
 * The function "createLogMessage" creates a log message by concatenating the user role, date, and
 * action.
 * @param user_role - The role of the user performing the action. For example, "admin", "user",
 * "manager", etc.
 * @param date - The date parameter is a string that represents the date of the log message. It can be
 * in any format that is suitable for your application, such as "YYYY-MM-DD" or "MM/DD/YYYY".
 * @param action - The action parameter represents the action that the user performed. It could be any
 * action relevant to the system or application that the log message is being created for. For example,
 * it could be "login", "create", "update", "delete", "approve", etc.
 * @returns a log message that includes the user role, date, and action.
 */
function createLogMessage(user_role, date, action){
    const log = " : "+user_role+" : "+date+" : "+action
    return log
}

/**
 * The function `newLog` creates a log entry with the user's information, current date, and the
 * specified action.
 * @param token - The `token` parameter is a unique identifier that is used to authenticate and
 * authorize a user. It is typically generated when a user logs in or signs up and is used to validate
 * subsequent requests made by the user.
 * @param action - The `action` parameter represents the action that is being logged. It could be any
 * string that describes the action being performed, such as "User login", "Data update", or "File
 * deletion".
 */
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