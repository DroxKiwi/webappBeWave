const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_dev_studiecf',
    password: 'psqlpsw',
})


function createLogMessage(user_email, user_role, date, action){
    const log = " : "+user_role+" : "+date+" : "+action
    return log
}

function newLog(token, action){
    const date = new Date() 
    pool.query(`SELECT email, role FROM users WHERE token = '${token}'`, (error, results) => {
        if (error){
            throw error
        }
        else {
            const user_email = results.rows[0].email
            const user_role = results.rows[0].role
            const log_message = createLogMessage(user_email, user_role, date, action)
            pool.query(`INSERT INTO logs (user_email, log_message) VALUES ('${user_email}', '${log_message}')`, (error, results) => {
                if (error){
                    throw error
                }
            })
        }
    })
}

module.exports = { newLog }