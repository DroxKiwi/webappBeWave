const { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin } = require("../Controllers/app")

function appRoute(app){

    // Homepage application and redirection
    app.get('/', redirectHomepage)

    app.get('/contact', redirectContact)

    app.get('/suscribe', redirectSuscribe)

    // login is a redirection to get clear /userLogin path from to much code
    app.get('/login', redirectLogin)

    // user settings redirection
    app.get('/informationUser')
}

module.exports = appRoute