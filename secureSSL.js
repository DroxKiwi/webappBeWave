const express = require('express')
const cookieParser = require('cookie-parser')
const getRolesMiddleware = require("./Utils/getRolesMiddleware")
const twig = require('twig')
const bodyParser = require('body-parser')
const fs = require("fs") //file system module
const https = require("https") // https module to create a ssl enabled server
const path = require("path") // path module 
const app = express()

// IF USING NPM !
const port = process.env.PORT
//IF USING NODEMON !
// const port = 3000

console.log(`Ready on ${process.env.NODE_ENV} mode`)
console.log(`Port listening on ${process.env.PORT} mode`)

// SSL certificate implementation

const options ={
      key:fs.readFileSync(path.join(__dirname,'./cert/key.pem')),
      cert:fs.readFileSync(path.join(__dirname,'./cert/cert.pem'))
}
const sslserver = https.createServer(options,app)


// routing initialization
const userRoute = require("./Routes/user")
const appRoute = require("./Routes/app")
const adminRoute = require("./Routes/dashboard")


sslserver.use(express.json())
sslserver.use(cookieParser())
sslserver.use(getRolesMiddleware)
// set as view engine 
sslserver.set('view engine', 'twig')
sslserver.set('views', './Views')
sslserver.engine('twig', twig.renderFile);

// used to parse form
sslserver.use(bodyParser.urlencoded({ extended: false }));

// Setting up static directory
sslserver.use(express.static('Public'));

userRoute(sslserver)
appRoute(sslserver)
adminRoute(sslserver)

sslserver.listen(port, () => {
    console.log(`Secure server listening on port ${port}`)
})