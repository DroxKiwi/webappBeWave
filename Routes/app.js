const { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin, redirectCreateAccount, redirectInformation, redirectSettings, redirectReport, redirectBetatesterDelete } = require("../Controllers/app")

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

    // user settings redirection
    app.get('/information', redirectInformation)

    // Account settings are managed by the user controller
    app.get('/settings', redirectSettings)

    app.get('/report', redirectReport)

}

module.exports = appRoute