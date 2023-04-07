const { getTest, createTest, updateTest, removeTest } = require("../Controllers/api")

function apiRoute(app){
    // User CRUD routing


    app.get('/get', getTest)

    app.post('/create', createTest)

    app.post('/update', updateTest)

    app.post('/remove', removeTest)

}

module.exports = apiRoute