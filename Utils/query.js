const pool = require('../Utils/db')


function select(param, table, row, value){
    pool.query(`SELECT '${param}' FROM '${table}' WHERE '${row}' LIKE '${value}'`, (error, results) => {
        if (error){
            return error
        }
        else {
            return results.rows
        }
    })
}

module.exports = { select }