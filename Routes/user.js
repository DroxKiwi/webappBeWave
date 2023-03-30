const { userRead, userCreate, userUpdate, userDelete } = require("../Controllers/user")

function userCRUD(app){
    // User CRUD 

    // Create
    app.post("/userCreate", userCreate)

    // Read
    app.get("/usersGet", userRead)

    // Update
    app.post("/userUpdate", userUpdate)
    // Delete
    app.post("/userDelete", userDelete)
}

module.exports = userCRUD