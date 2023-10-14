const userCRUD = require("../CRUD/user")

const UNAUTHENTICATED_ROLE = 'unauthenticated';


/**
 * The function is a middleware that checks if a user is authenticated and retrieves their role from a
 * database.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, query parameters, and body data.
 * @param res - The `res` parameter is the response object that represents the HTTP response that will
 * be sent back to the client. It is used to send data, set headers, and control the response behavior.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically called at the end of the current
 * middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 * @returns In this code, the function is returning the result of calling the `next()` function.
 */
async function getRolesMiddleware(req, res, next){
    if (!req.cookies.userToken){
        req.role = UNAUTHENTICATED_ROLE
        return next()
    }
    else {
        const userToken = req.cookies.userToken.token
        // Validating user input is a best practice to prevent SQL injection attacks.
        //if (!/^[a-zA-Z0-9]+$/.test(userToken)) {
        //    throw new Error('Invalid userToken');
        //}
        const answer_user = await userCRUD.get("*", "token", userToken)
        const userCheck = answer_user[0]
        if (!userCheck){
            req.role = UNAUTHENTICATED_ROLE
            return next()
        }
        req.pseudo = userCheck.pseudo
        req.role = userCheck.role
        return next()
    }
}

module.exports = getRolesMiddleware