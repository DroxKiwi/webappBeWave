const { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin, redirectCreateAccount, redirectInformation, redirectSettings, settingsPreferences, redirectReport } = require("../Controllers/app")

function appRoute(app){

    // Homepage application and redirection
    app.get('/', redirectHomepage)

    app.get('/contact', redirectContact)

    app.get('/suscribe', redirectSuscribe)

    // login is a redirection to get clear /userLogin path from to much code
    app.get('/login', redirectLogin)

    app.get('/createAccount', redirectCreateAccount)

    // user settings redirection
    app.get('/information', redirectInformation)

    app.get('/settings', redirectSettings)
    app.post('/settingsPreferences', settingsPreferences)

    app.get('/report', redirectReport)

}

module.exports = appRoute