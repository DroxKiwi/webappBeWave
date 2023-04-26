const { homeDashboard, showLogs, showFormcontact, showCruds, showAPI } = require("../Controllers/dashboard")

function adminRoute(app){

    // Dashboard and redirection
    app.get('/dashboard', homeDashboard)

    app.get('/logs', showLogs)

    app.get('/formcontact', showFormcontact)

    app.get('/showcruds', showCruds)

    app.get('/apimanagement', showAPI)
}

module.exports = adminRoute