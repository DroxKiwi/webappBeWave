async function getRolesMiddleware(req, res, next){
    if (!req.cookies.userToken){
        req.role = "unauthentificated"
        return next()
    }
    const user = req.app.get("models").User
    const userToken = req.cookies.userToken.token
    const userCheck = await user.findOne({ token: userToken })
    if (!userCheck){
        req.role = "unauthentificated"
        return next()    
    }

    req.role = userCheck.role
    return next()
}

module.exports = getRolesMiddleware