const { get, create, update, remove } = require("../CRUD/user")

function userCRUD(app){
    // User CRUD 

    // Create
    app.post("/userCreate", create)

    // Read
    app.get("/usersGet", get)

    // Update
    app.post("/userUpdate", update)
    // Delete
    app.post("/userDelete", remove)
}

module.exports = userCRUD