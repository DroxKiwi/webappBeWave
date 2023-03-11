const { usersGet, userCreate } = require("../Controllers/user")

function userRoute(app){

    app.get("/users", usersGet)

    app.post("/userCreate", userCreate)
}

module.exports = userRoute