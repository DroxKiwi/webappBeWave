const encryptPassword = require("../Utils/encryptPassword")
const decryptPassword = require("../Utils/decryptPassword")
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})


async function redirectHomepage(req, res){
    if (req.role != "unauthentificated"){
        const id = req.pseudo
        res.render('./Templates/home.html.twig', { id })
    }
    else {
        const id = "unauthentificated"
        res.render('./Templates/home.html.twig', { id })
    }
}

async function redirectContact(req, res){
    if (req.role != "unauthentificated"){
        const id = req.pseudo
        res.render('./Templates/contact.html.twig', { id })
    }
    else {
        const id = "unauthentificated"
        res.render('./Templates/contact.html.twig', { id })
    }
}

async function redirectSuscribe(req, res){
    if (req.role != "unauthentificated"){
        const id = req.pseudo
        res.render('./Templates/suscribe.html.twig', { id })
    }
    else {
        const id = "unauthentificated"
        res.render('./Templates/suscribe.html.twig', { id })
    }
}

async function redirectLogin(req, res){
    res.render('./Templates/login.html.twig')
}
module.exports = { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin }