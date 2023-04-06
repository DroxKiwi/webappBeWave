const { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin, redirectCreateAccount, redirectInformation, redirectSettings, redirectBetatesterDelete, settingsPreferences, userLogin, userLogout, resetPassword, updateUserAccount, deleteUserAccount } = require("../Controllers/app")

function appRoute(app){

    // Homepage application and redirection
    app.get('/', redirectHomepage)

    app.get('/contact', redirectContact)
    app.post('/contact', redirectContact)

    app.get('/suscribe', redirectSuscribe)
    app.post('/suscribe', redirectSuscribe)
    app.post('/betatesterDelete', redirectBetatesterDelete)

    // login is a redirection to get clear /userLogin path from to much code
    app.get('/login', redirectLogin)

    app.get('/createAccount', redirectCreateAccount)

    app.post('/updateaccount', updateUserAccount)

    app.post('/deteleaccount', deleteUserAccount)

    // user settings redirection
    app.get('/information', redirectInformation)

    // Account settings are managed by the user controller
    app.get('/settings', redirectSettings)

    // Reset the user password with one randomly generated
    app.post("/resetpassworduser", resetPassword)

    // Set preferences 
    app.post('/settingsPreferences', settingsPreferences)

    // Login
    app.post("/userLogin", userLogin)
    // Logout
    app.get("/userLogout", userLogout)
}

module.exports = appRoute