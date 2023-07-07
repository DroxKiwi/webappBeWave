const SHA256 = require("crypto-js/sha256")
const encBase64 = require ("crypto-js/enc-base64")

/**
 * The function `decryptPassword` takes a salt, hash, and token along with a password, and checks if
 * the password matches the hash by hashing it with the salt and comparing it to the given hash.
 * @param password - The `password` parameter is the password that you want to check against the stored
 * hash.
 * @returns If the hash of the salt and password matches the provided hash, the function will return an
 * object with the token. Otherwise, it will return false.
 */
function decryptPassword({ salt, hash, token }, password){
    const hashCheck = SHA256(salt + password).toString(encBase64)

    if (hash === hashCheck){
        return { token }
    }
    else {
        return false
    }
}

module.exports = decryptPassword