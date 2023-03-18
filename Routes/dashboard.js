const { redirectDashboard, redirectAdminCreatUser, redirectShowUser, redirectLogs, redirectFormcontact } = require("../Controllers/dashboard")

function adminRoute(app){

    // Dashboard and redirection
    app.get('/dashboard', redirectDashboard)

    app.get('/makeuser', redirectAdminCreatUser)

    app.post('/showuser', redirectShowUser)

    app.get('/logs', redirectLogs)

    app.get('/formcontact', redirectFormcontact)

}

module.exports = adminRoute