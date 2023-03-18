const express = require('express')
const cookieParser = require('cookie-parser')
const getRolesMiddleware = require("./Utils/getRolesMiddleware")
const twig = require('twig')
const bodyParser = require('body-parser')
const app = express()

// IF USING NPM !
const port = process.env.prod.PORT
// const port = process.env.dev.PORT
//IF USING NODEMON !
// const port = 3000

console.log(`Ready on ${process.env.prod.NODE_ENV} mode`)
console.log(`Port listening on ${process.env.prod.PORT} mode`)

//console.log(`Ready on ${process.env.prod.NODE_ENV} mode`)
//console.log(`Port listening on ${process.env.prod.PORT} mode`)

// routing initialization
const userRoute = require("./Routes/user")
const appRoute = require("./Routes/app")
const adminRoute = require("./Routes/dashboard")


app.use(express.json())
app.use(cookieParser())
app.use(getRolesMiddleware)
// set as view engine 
app.set('view engine', 'twig')
app.set('views', './Views')
app.engine('twig', twig.renderFile);

// used to parse form
app.use(bodyParser.urlencoded({ extended: false }));

// Setting up static directory
app.use(express.static('Public'));

userRoute(app)
appRoute(app)
adminRoute(app)

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})