const userCRUD = require("../CRUD/user")

async function getRolesMiddleware(req, res, next){
    if (!req.cookies.userToken){
        req.role = "unauthentificated"
        return next()
    }
    const userToken = req.cookies.userToken.token
    const answer_user = await userCRUD.get("*", "token", userToken)
    const userCheck = answer_user[0]
    if (!userCheck){
        req.role = "unauthentificated"
        return next()
    }
    req.pseudo = userCheck.pseudo
    req.role = userCheck.role
    return next()
}

module.exports = getRolesMiddleware