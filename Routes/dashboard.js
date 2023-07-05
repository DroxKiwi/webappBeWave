const { homeDashboard, showLogs, showFormcontact, showAPI, spacruds } = require("../Controllers/dashboard")

function adminRoute(app){

    // Dashboard and redirection
    app.get('/dashboard', homeDashboard)

    app.get('/logs', showLogs)

    app.get('/formcontact', showFormcontact)

    app.get('/spacruds', spacruds)

    app.get('/apimanagement', showAPI)

    app.get('/spacruds', spacruds)
}

module.exports = adminRoute