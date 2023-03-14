const express = require('express')
const { Pool } = require('pg')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const getRolesMiddleware = require("./Utils/getRolesMiddleware")

const twig = require('twig')
const bodyParser = require('body-parser')
//const bootstrap = require('bootstrap')

const port = 3000
const app = express()
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})

// Read the SQL file
const userModel = fs.readFileSync('./Models/user.sql').toString()

// Execute the SQL commands in the database
pool.query(userModel, (err, result) => {
    if (err) throw err
})

const userRoute = require("./Routes/user")

app.use(express.json())
app.use(cookieParser())
app.use(getRolesMiddleware)
// set as view engine 
app.set('view engine', 'twig')
app.set('views', './Views')
app.engine('twig', twig.renderFile);

// used to parse form
app.use(bodyParser.urlencoded({ extended: false }));

// Homepage application
app.get('/', (req, res) => {
    if (req.role != "unauthentificated"){
        const id = req.pseudo
        res.render('./Templates/home.html.twig', { id })
    }
    else {
        const id = "unauthentificated"
        res.render('./Templates/home.html.twig', { id })
    }
})

// /login is a redirection to get clear /userLogin path from to much code
app.get('/login', (req, res) => {
    res.render('./Templates/login.html.twig')
})

userRoute(app)

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})