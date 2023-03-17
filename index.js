const express = require('express')
const { Pool } = require('pg')
const cookieParser = require('cookie-parser')
const getRolesMiddleware = require("./Utils/getRolesMiddleware")
const twig = require('twig')
const bodyParser = require('body-parser')


const port = process.env.PORT
const app = express()
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
})

console.log(`Ready on ${process.env.NODE_ENV} mode`)
console.log(`Port listening on ${process.env.PORT} mode`)

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