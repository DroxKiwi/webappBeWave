const {  } = require("../Controllers/dashboard")

function appRoute(app){

    // Dashboard and redirection
    app.get('/dashboard', redirectDashboard)

}

module.exports = appRoute