const { usersGet, userCreate, userUpdate, userDelete, userLogin, userLogout } = require("../Controllers/user")

function userRoute(app){

    // User CRUD routing

    // Create
    app.post("/userCreate", userCreate)
    // Read
    app.get("/users", usersGet)
    // Update
    app.post("/userUpdate", userUpdate)
    // Delete
    app.post("/userDelete", userDelete)

    // Login
    app.post("/userLogin", userLogin)
    // Logout
    app.get("/userLogout", userLogout)
}

module.exports = userRoute