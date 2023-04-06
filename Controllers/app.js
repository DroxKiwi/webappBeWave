const pool = require('../Utils/db')
const logger = require("../Utils/logger")
const decryptPassword = require("../Utils/decryptPassword")
const userCRUD = require("../CRUD/user")
const contactCRUD = require("../CRUD/contact")
const betatesterCRUD = require("../CRUD/betatesteur")


// Redirection to the landingpage
async function redirectHomepage(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preference = preferencesTab[0].preferences[0]
        const role = req.role
        const templateVars = [id, preference, role]
        res.render('./Templates/home.html.twig', { templateVars })
    }
    else {
        // This variable "id" allowed the twig template to adapt what it need to show (connection button, create account button, ...)
        const id = "unauthentificated"
        res.render('./Templates/home.html.twig', { id })
    }
}

// Redirection to the contact page
async function redirectContact(req, res){
    const { sendContact, message, type } = req.body
    if ( sendContact == "true" ){
        const userToken = req.cookies.userToken.token
        const answer_user_id = await userCRUD.get('user_id', 'token', userToken)
        const user_id = answer_user_id[0].user_id
        await contactCRUD.create(user_id, type, message)
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preference = preferencesTab[0].preferences[0]
        const id = req.pseudo
        const role = req.role
        const formSend = "Votre formulaire a bien été pris en compte !"
        const templateVars = [id, preference, role, formSend]
        res.render('./Templates/contact.html.twig', { templateVars })
    }
    else {
        if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
            const userToken = req.cookies.userToken.token
            const id = req.pseudo
            const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
            const preference = preferencesTab[0].preferences[0]
            const role = req.role
            const templateVars = [id, preference, role]
            res.render('./Templates/contact.html.twig', { templateVars })
        }
        else {
            const id = "unauthentificated"
            res.render('./Templates/contact.html.twig', { id })
        }
    }
}

// Redirection to the suscribe page
async function redirectSuscribe(req, res){
    const { consent, suscribeBeta, firstname, name, dob, adress, phone } = req.body
    if (suscribeBeta == "true"){
        const userToken = req.cookies.userToken.token
        const pseudo = req.pseudo
        const answer_user_id = await userCRUD.get('user_id', 'token', userToken)
        const user_id = answer_user_id[0].user_id
        message = pseudo+" : suscribe to beta tester"
        logger.newLog(req.cookies.userToken.token, message)
        await betatesterCRUD.create(user_id, firstname, name, dob, adress, phone)
        res.redirect(302, '/')
    }
    else {
        if (!consent){
            if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
                const userToken = req.cookies.userToken.token
                const id = req.pseudo
                const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
                const preference = preferencesTab[0].preferences[0]
                const role = req.role
                const templateVars = [id, preference, role]
                res.render('./Templates/suscribe.html.twig', { templateVars })
            }
            else {
                const id = "unauthentificated"
                res.render('./Templates/suscribe.html.twig', { id })
            }
        }
        else {
            if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
                const userToken = req.cookies.userToken.token
                const id = req.pseudo
                const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
                const preference = preferencesTab[0].preferences[0]
                const role = req.role
                const templateVars = [id, preference, role]
                res.render('./Templates/createbetatester.html.twig', { templateVars })
            }
            else {
                const id = "unauthentificated"
                res.render('./Templates/login.html.twig', { id })
            }
        }
    }
}

async function redirectBetatesterDelete(req, res){
    const { nonselfupdate, user_id, userPseudo } = req.body
    if (!nonselfupdate){
        if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
            const userToken = req.cookies.userToken.token
            const pseudo = req.pseudo
            message = pseudo+" : delete his account from beta tester"
            logger.newLog(req.cookies.userToken.token, message)
            const betatester_id = await betatesterCRUD.get('betatester_id', 'user_id', user_id)
            await betatesterCRUD.remove(betatester_id[0].betatester_id)
            res.redirect(302, '/information')
        }
    }
    else {
        const pseudo = req.pseudo
        message = pseudo+" : delete "+userPseudo+" account from beta tester"
        logger.newLog(req.cookies.userToken.token, message)
        const answer_betatester_id = await betatesterCRUD.get('betatester_id', 'user_id', user_id)
        const betatester_id = answer_betatester_id[0].betatester_id
        await betatesterCRUD.remove(betatester_id)
        res.redirect(302, '/dashboard')
    }
}

// Redirection to the login form
async function redirectLogin(req, res){
    res.render('./Templates/login.html.twig')
}

// Redirection to the creation form
async function redirectCreateAccount(req, res){
    res.render('./Templates/createaccount.html.twig')
}

// Redirection to the information page account
async function redirectInformation(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preference = preferencesTab[0].preferences[0]
        const answer_user_param = await userCRUD.get('user_id, pseudo, email', 'token', userToken)
        const user_id = answer_user_param[0].user_id
        const pseudo = answer_user_param[0].pseudo
        const email = answer_user_param[0].email
        const answer_betatester = await betatesterCRUD.get('*', 'user_id', user_id)
        if (!answer_betatester[0]){
            const templateVars = [id, preference, pseudo, email]
            res.render('./Templates/information.html.twig', { templateVars })
        }
        else {
            const betatesters_info = answer_betatester[0]
            const templateVars = [id, preference, pseudo, email, betatesters_info]
            res.render('./Templates/information.html.twig', { templateVars })
        }
    }
    // If the user is not loged, we redirect him to the landingpage
    else {
        res.redirect(302, '/')
    }
}

// Redirection to the settings account page
async function redirectSettings(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const id = req.pseudo
        const preferencesTab = await userCRUD.get('preferences', 'token', userToken)
        const preference = preferencesTab[0].preferences[0]
        const templateVars = [id, preference]
        res.render('./Templates/settings.html.twig', { templateVars })
    }
    else {
        res.redirect(302, '/')
    }
}

async function userLogin(req, res){
    const { id, password, remember } = req.body
    const answer_user_pseudo = await userCRUD.get('*', 'pseudo', id)
    const verif_user_pseudo = answer_user_pseudo[0]
    if (!verif_user_pseudo){
        const answer_user_email = await userCRUD.get('*', 'email', id)
        const verif_user_email = answer_user_email[0]
        if (!verif_user_email){
            return res.send("Aucun utilisateur trouvé ! Contactez un Admin ou vérifiez vos identifiants")
        }
        else {
            const currentUser = verif_user_email
            const userToken = decryptPassword(currentUser, password)
            if (!userToken){
                return res.send('Connexion impossible, vérifiez votre mot de passe')
            }
            else {
                message = "Log in : "+currentUser.email
                logger.newLog(currentUser.token, message)
                // If the user want to be log in for long time, we create a 1 year token
                if (remember){
                    // token is saved for 1 year
                    res.cookie('userToken', userToken, { maxAge: 15552000000, httpOnly: true });
                    //res.send('Authentication successful');
                    res.redirect(302, '/')     
                }
                else {
                    // token is saved for 25 minutes
                    res.cookie('userToken', userToken, { maxAge: 900000, httpOnly: true });
                    //res.send('Authentication successful');
                    res.redirect(302, '/')
                }
            }
        }
    }
    else {
        const currentUser = verif_user_pseudo
        const userToken = decryptPassword(currentUser, password)
        if (!userToken){
            return res.send('Connexion impossible, vérifiez votre mot de passe')
        }
        else {
            message = "Log in : "+currentUser.pseudo
            logger.newLog(currentUser.token, message)
            if (remember){
                // token is saved for 1 year
                res.cookie('userToken', userToken, { maxAge: 15552000000, httpOnly: true });
                //res.send('Authentication successful');
                res.redirect(302, '/')
            }
            else {
                // token is saved for 25 minutes
                res.cookie('userToken', userToken, { maxAge: 900000, httpOnly: true });
                //res.send('Authentication successful');
                res.redirect(302, '/')
            }
        }
    }
}

// Used to delete cookies 
async function userLogout(req, res){
    userToken = req.cookies.userToken.token
    const answer_pseudo = await userCRUD.get('pseudo', 'token', userToken)
    const pseudo = answer_pseudo[0].pseudo
    message = "Log out : "+pseudo
    logger.newLog(req.cookies.userToken.token, message)
    res.clearCookie('userToken')
    res.redirect(302, '/')
}


// Here we set the preferences choosen by the user into the databse
async function settingsPreferences(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const { colorapp } = req.body
        const answer_user_id = await userCRUD.get('user_id', 'token', userToken)
        const user_id = answer_user_id[0].user_id
        await userCRUD.update(user_id, '', '', '', '', colorapp)
        res.redirect(302, '/settings')
    }
    else {
        res.redirect(302, '/')
    }
}


async function updateUserAccount(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const { pseudo, email, password } = req.body
        // Here we are updating the user account itself (the one beeing connected)
        const userToken = req.cookies.userToken.token
        const answer_user_id = await userCRUD.get('user_id', 'token', userToken)
        const user_id = answer_user_id[0].user_id
        message = "Update is account pseudo : "+pseudo
        logger.newLog(req.cookies.userToken.token, message)
        // To verify which form is send we check if pseudo, email or password is true (not null)
        if (pseudo){
            await userCRUD.update(user_id, pseudo, '', '', '', '')
            res.redirect(302, '/information')
        }
        if (email){
            const answer_exist_user_email = await userCRUD.get('email', 'email', email)
            const exist_user_email = answer_exist_user_email[0].email
            if (!exist_user_email){
                await userCRUD.update(user_id, '', email, '', '', '')
                res.redirect(302, '/information')
            }
            else {
                res.send("An account already exist with this email")
            }
        }
        if (password){
            await userCRUD.update(user_id, '', '', password, '', '')
            res.redirect(302, '/information')
        }
    }
    else {
        res.redirect(302, '/')
    }
}

// Delete a user by token selection
async function deleteUserAccount(req, res){
    if (req.role == "ROLE_USER" || req.role == "ROLE_ADMIN"){
        const userToken = req.cookies.userToken.token
        const pseudo = req.pseudo
        const answer_user_id = await userCRUD.get('user_id', 'token', userToken)
        const user_id = answer_user_id[0].user_id
        message = "Delete his account : "+pseudo
        logger.newLog(req.cookies.userToken.token, message)
        const answer_betatester_id = await betatesterCRUD.get('betatester_id', 'user_id', user_id)
        const betatester_id = answer_betatester_id[0].betatester_id
        await betatesterCRUD.remove(betatester_id)
        await userCRUD.remove(user_id)
        res.redirect(302, '/')
    }
}

module.exports = { redirectHomepage, redirectContact, redirectSuscribe, redirectLogin, redirectCreateAccount, redirectInformation, redirectSettings, redirectBetatesterDelete, settingsPreferences, userLogin, userLogout, updateUserAccount, deleteUserAccount }