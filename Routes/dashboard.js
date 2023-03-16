const { redirectDashboard, redirectAdminCreatUser, redirectShowUser } = require("../Controllers/dashboard")

function adminRoute(app){

    // Dashboard and redirection
    app.post('/dashboard', redirectDashboard)

    app.get('/makeuser', redirectAdminCreatUser)

    app.post('/showuser', redirectShowUser)

}

module.exports = adminRoute