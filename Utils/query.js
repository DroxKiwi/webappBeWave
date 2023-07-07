const pool = require("../Utils/db")

// Used to concatenate string of values for a query
/**
 * The function prepares an array of values for use in a SQL query by adding quotes around non-null
 * values and formatting them as a comma-separated list enclosed in parentheses.
 * @param values - An array of values that need to be prepared for insertion into a database query.
 * @returns a string that represents the prepared values.
 */
function prepareValues(values){
    var preparedValues = "("
    for (let i = 0; i < values.length-1; i++){
        if (values[i] == 'NULL'){
            preparedValues+=values[i]+", "
        }
        else {
            preparedValues+="'"+values[i]+"', "
        }
    }
    if (values[values.length-1] == 'NULL'){
        preparedValues+=values[values.length-1]
    }
    else {
        preparedValues+="'"+values[values.length-1]+"'"
    }
    preparedValues+=")"
    console.log(preparedValues)
    return preparedValues
}

// Used to select from a table 
/**
 * The function `select` is an asynchronous function that takes in two parameters, `rows` and `table`,
 * and returns the result of a SELECT query on the specified table with the specified columns.
 * @param rows - The `rows` parameter is a string that specifies the columns you want to select from
 * the table. For example, if you want to select the "name" and "age" columns, you would pass in "name,
 * age" as the value for the `rows` parameter.
 * @param table - The `table` parameter is the name of the table from which you want to select rows.
 * @returns the selected rows from the specified table.
 */
async function select(rows, table){
    if (!rows || !table) {
        throw new Error('Input parameters cannot be null, undefined, or empty.');
    }
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
        console.error(err);
        return 'An error occurred while selecting from the table.';
    }
}

// Used to select from a table where we want to compare with equal operator
/**
 * The function `selectEqual` is an asynchronous function that executes a SQL query to select rows from
 * a table where a specific column has a specified value, and returns the results.
 * @param rows - The "rows" parameter is a string that represents the columns you want to select from
 * the table. For example, if you want to select the "name" and "age" columns, you would pass "name,
 * age" as the value for the "rows" parameter.
 * @param table - The `table` parameter is the name of the table in the database that you want to
 * query.
 * @param rowsToCompare - The parameter "rowsToCompare" is the column name in the table that you want
 * to compare with the "valueToCompare". It is used in the WHERE clause of the SQL query to filter the
 * rows based on the given condition.
 * @param valueToCompare - The value that you want to compare the rowsToCompare against in the WHERE
 * clause of the SQL query.
 * @returns the results of the SQL query as an array of rows.
 */
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

/**
 * The function prepares a query string for multiple "LIKE" conditions in a SQL statement.
 * @param rowsToPrepare - An array of rows to prepare for the query.
 * @param model - The `model` parameter represents the value that you want to compare the rows with in
 * the `LIKE` clause. It is a string value.
 * @param operator - The `operator` parameter is a string that represents the comparison operator to be
 * used in the query. It could be any valid comparison operator such as "=", "<", ">", "<=", ">=",
 * "LIKE", etc.
 * @returns a prepared query string.
 */
function prepareSeveralLike(rowsToPrepare, model, operator){
    let preparedQuery = ""
    for (let i = 0; i < rowsToPrepare.length; i++){
        if (i < rowsToPrepare.length-1){
            preparedQuery+=rowsToPrepare[i]+' '+'LIKE'+' '+"'"+model+"'"+' '+operator+' '
        }
        else {
            preparedQuery+=rowsToPrepare[i]+' '+"LIKE"+' '+"'"+model+"'"
        }
    }
    return preparedQuery
}

// Used to select from a table where we want to compare with LIKE operator
/**
 * The function `selectLike` is an asynchronous function in JavaScript that performs a SELECT query on
 * a database table based on a LIKE condition.
 * @param rows - The "rows" parameter is a string that represents the columns you want to select from
 * the table. For example, if you want to select the "name" and "age" columns, you would pass "name,
 * age" as the value for the "rows" parameter.
 * @param table - The name of the table in the database where you want to perform the SELECT query.
 * @param rowsToCompare - The columns in the table that you want to compare with the valueToCompare.
 * @param valueToCompare - The value that you want to compare with the rows in the table.
 * @param [several=false] - A boolean value indicating whether multiple rows should be returned or not.
 * If set to true, the function will use the prepareSeveralLike function to generate a dynamic query
 * based on the model and operator parameters.
 * @param [model] - The `model` parameter is an optional parameter that specifies the model to be used
 * for the comparison. It is used in the `prepareSeveralLike` function to generate the query for
 * multiple comparisons. If not provided, it will default to `undefined`.
 * @param [operator] - The `operator` parameter is used to specify the comparison operator to be used
 * in the query. It is an optional parameter and its default value is `undefined`. If `operator` is not
 * provided, the query will use the `LIKE` operator for comparison.
 * @returns the result of the SELECT query as an array of rows.
 */
async function selectLike(rows, table, rowsToCompare, valueToCompare, several = false, model = undefined, operator = undefined){
    if (several){
        const preparedQuery = prepareSeveralLike(rowsToCompare, model, operator)
        let answer = ""
        try {
            await pool.query(`SELECT ${rows} FROM ${table} WHERE ${preparedQuery}`)
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
    else {
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
}

// Used to insert a nuplet into a table
/**
 * The function `insert` inserts rows into a specified table with given values and returns the inserted
 * rows.
 * @param rows - The `rows` parameter is a string that represents the columns in the table where the
 * values will be inserted. For example, if you want to insert values into the columns "name" and
 * "age", the `rows` parameter would be "name, age".
 * @param table - The `table` parameter is a string that represents the name of the table in which you
 * want to insert the values.
 * @param values - The `values` parameter is an array of values that you want to insert into the
 * database table. Each value in the array corresponds to a column in the table.
 * @returns the result of the query, which is the answer to the INSERT statement.
 */
async function insert(rows, table, values){
    try {
        const preparedValues = prepareValues(values)
        const answer = await pool.query(`INSERT INTO ${table} ${rows} VALUES ${preparedValues} RETURNING *`)
        return answer
    }
    catch(err){
        throw err
    }
}

/**
 * The function updates a specific row in a table with a new value based on a comparison of another
 * row's value.
 * @param row - The "row" parameter represents the column name in the table that you want to update.
 * @param table - The `table` parameter represents the name of the table in the database that you want
 * to update.
 * @param value - The `value` parameter is the new value that you want to update the specified row with
 * in the given table.
 * @param rowToCompare - The parameter `rowToCompare` is the name of the column in the table that you
 * want to use for comparison. It is the column that you will specify in the WHERE clause of the UPDATE
 * statement to identify the row(s) that you want to update.
 * @param valueToCompare - The `valueToCompare` parameter is the value that will be used to identify
 * the row to be updated in the database table. It is the value that will be compared against the
 * values in the `rowToCompare` column.
 */
async function update(row, table, value, rowToCompare, valueToCompare){
    try {
        if (value == "NULL"){
            await pool.query(`UPDATE ${table} SET ${row} = ${value} WHERE ${rowToCompare} = '${valueToCompare}'`)
        }
        else {
            await pool.query(`UPDATE ${table} SET ${row} = '${value}' WHERE ${rowToCompare} = '${valueToCompare}'`)
        }
    }
    catch(err){ 
        throw err
    }
}

/**
 * The function removes a row from a specified table in a database based on a specified column and
 * value to compare.
 * @param table - The `table` parameter is the name of the table from which you want to remove a row.
 * @param rowToCompare - The `rowToCompare` parameter is the name of the column in the table that you
 * want to compare with the `valueToCompare` parameter.
 * @param valueToCompare - The value that you want to compare with the row in the table.
 */
async function remove(table, rowToCompare, valueToCompare){
    try {
        await pool.query(`DELETE FROM ${table} WHERE ${rowToCompare} = '${valueToCompare}'`)
    }
    catch(err){
        throw err
    }
}

module.exports = { select, selectEqual, selectLike,insert, update, remove }