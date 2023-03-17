const { redirectDashboard, redirectAdminCreatUser, redirectShowUser, getLogs } = require("../Controllers/dashboard")

function adminRoute(app){

    // Dashboard and redirection
    app.get('/dashboard', redirectDashboard)

    app.get('/makeuser', redirectAdminCreatUser)

    app.post('/showuser', redirectShowUser)

    app.get('/logs', getLogs)

}

module.exports = adminRoute