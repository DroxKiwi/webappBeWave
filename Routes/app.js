const { redirectHomepage, redirectContact, redirectSuscribe, redirectInformation, redirectSettings, redirectBetatesterDelete, settingsPreferences, userLogin, userLogout, userCreateAccount, updateUserAccount, deleteUserAccount } = require("../Controllers/app")

function appRoute(app){

    // Homepage application and redirection
    app.get('/', redirectHomepage)

    app.get('/contact', redirectContact)
    app.post('/contact', redirectContact)

    app.get('/suscribe', redirectSuscribe)
    app.post('/suscribe', redirectSuscribe)
    app.post('/betatesterDelete', redirectBetatesterDelete)

    app.get('/createAccount', userCreateAccount)
    app.post('/userCreate', userCreateAccount)

    app.post('/updateaccount', updateUserAccount)

    app.post('/deteleaccount', deleteUserAccount)

    // user settings redirection
    app.get('/information', redirectInformation)

    // Account settings are managed by the user controller
    app.get('/settings', redirectSettings)

    // Set preferences 
    app.post('/settingsPreferences', settingsPreferences)


    // Login
    app.get("/login", userLogin)
    app.post("/userLogin", userLogin)
    
    // Logout
    app.get("/userLogout", userLogout)
}

module.exports = appRoute