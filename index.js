const express = require('express')
const cookieParser = require('cookie-parser')
const getRolesMiddleware = require("./Utils/getRolesMiddleware")
const twig = require('twig')
const bodyParser = require('body-parser')
const app = express()
const fileUpload = require('express-fileupload')
const cors = require('cors')
const csrf = require('csurf')

// IF USING NPM !
const port = process.env.PORT || 3000
//IF USING NODEMON !
// const port = 3000

console.log(`Ready on ${process.env.NODE_ENV} mode`)
console.log(`Port listening on ${process.env.PORT}`)

// routing initialization
const appRoute = require("./Routes/app")
const adminRoute = require("./Routes/dashboard")
const apiRoute = require("./Routes/api")
const spacrudRoute = require("./Routes/spacruds")


app.use(cors())
app.use(express.json())
app.use(cookieParser())
// used to parse form
app.use(getRolesMiddleware)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(csrf({ cookie: true }))

// set as view engine 
app.set('view engine', 'twig')
app.set('views', './Views')
app.engine('twig', twig.renderFile)

// Setting up static directory
app.use(express.static('Public'))
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
)


appRoute(app)
adminRoute(app)
apiRoute(app)
spacrudRoute(app)

app.listen(port, () => {
    console.log(`Dev app listening on port ${port}`)
})