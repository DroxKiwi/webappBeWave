const pool = require("../Utils/db")

// Used to concatenate string of values for a query
function prepareValues(values){
    var preparedValues = "('"
    for (let i = 0; i < values.length-1; i++){
        preparedValues+=values[i]+"', '"
    }
    preparedValues+=values[values.length-1]
    preparedValues+="')"
    return preparedValues
}

// Used to select from a table 
async function select(rows, table){
    let answer = ""
    try {
        await pool.query(`SELECT ${rows} FROM ${table}`)
        .then((results, error) => {
            if (error){
                throw error
            }
            else {
                answer = results.rows
            }
        })
    return answer
    }
    catch(err){
        throw err
    }
}

// Used to select from a table where we want to compare with equal operator
async function selectEqual(rows, table, rowsToCompare, valueToCompare){
    let answer = ""
    try {
        await pool.query(`SELECT ${rows} FROM ${table} WHERE ${rowsToCompare} = '${valueToCompare}'`)
        .then(results => {
            answer = results.rows
        })
    return answer
    }
    catch(err){
        throw err
    }
}

// Used to select from a table where we want to compare with LIKE operator
async function selectLike(rows, table, rowsToCompare, valueToCompare){
    let answer = ""
    try {
        await pool.query(`SELECT ${rows} FROM ${table} WHERE ${rowsToCompare} LIKE '${valueToCompare}'`)
        .then((results, error) => {
            if (error){
                throw error
            }
            else {
                answer = results.rows
            }
        })
        return answer
    }
    catch(err){
        throw err
    }
}

// Used to insert a nuplet into a table
async function insert(rows, table, values){
    try {
        await pool.query(`INSERT INTO ${table} ${rows} VALUES ${values}`)
    }
    catch(err){
        throw err
    }
}

async function update(row, table, value, rowToCompare, valueToCompare){
    try {
        await pool.query(`UPDATE ${table} SET ${row} = '${value}' WHERE ${rowToCompare} = '${valueToCompare}'`)
    }
    catch(err){
        throw err
    }
}

async function remove(table, rowToCompare, valueToCompare){
    try {
        await pool.query(`DELETE FROM ${table} WHERE ${rowToCompare} = '${valueToCompare}'`)
    }
    catch(err){
        throw err
    }
}

module.exports = { prepareValues, select, selectEqual, selectLike,insert, update, remove }