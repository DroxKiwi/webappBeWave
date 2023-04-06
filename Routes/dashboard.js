const { homeDashboard, adminCreatUser, adminUpdateUserAccount, adminDeleteUserAccount, adminResetUserPassword, showDetailUser, showLogs, showFormcontact, searchUser } = require("../Controllers/dashboard")

function adminRoute(app){

    // Dashboard and redirection
    app.get('/dashboard', homeDashboard)

    app.get('/makeuser', adminCreatUser)
    app.post('/makeuser', adminCreatUser)

    app.post('/adminupdateuser', adminUpdateUserAccount)

    app.post('/admindeleteuser', adminDeleteUserAccount)

    // Reset the user password with one randomly generated
    app.post("/resetpassworduser", adminResetUserPassword)

    app.post('/showuser', showDetailUser)

    app.get('/logs', showLogs)

    app.get('/formcontact', showFormcontact)

    app.post("/searchuser", searchUser)
}

module.exports = adminRoute