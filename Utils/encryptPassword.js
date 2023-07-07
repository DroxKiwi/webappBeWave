const uid2 = require("uid2")
const SHA256 = require("crypto-js/sha256")
const encBase64 = require("crypto-js/enc-base64")

/**
 * The function encrypts a password by generating a random token and salt, and then hashing the salt
 * and password using SHA256 algorithm.
 * @param password - The `password` parameter is the user's password that needs to be encrypted.
 * @returns an object with three properties: "token", "salt", and "hash".
 */
function encryptPassword(password){
    const token = uid2(16)

    const salt = uid2(16)
    const hash = SHA256(salt + password).toString(encBase64)

    return{token, salt, hash}
}

module.exports = encryptPassword