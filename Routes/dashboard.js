const { homeDashboard, adminCreatUser, adminUpdateUserAccount, adminDeleteUserAccount, showDetailUser, showLogs, showFormcontact, searchUser } = require("../Controllers/dashboard")

function adminRoute(app){

    // Dashboard and redirection
    app.get('/dashboard', homeDashboard)

    app.get('/makeuser', adminCreatUser)
    app.post('/makeuser', adminCreatUser)

    app.post('/adminupdateuser', adminUpdateUserAccount)

    app.post('/admindeleteuser', adminDeleteUserAccount)

    app.post('/showuser', showDetailUser)

    app.get('/logs', showLogs)

    app.get('/formcontact', showFormcontact)

    app.post("/searchuser", searchUser)
}

module.exports = adminRoute