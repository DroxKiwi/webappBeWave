// const crypto = require('crypto')

/**
 * The function generates a random password of a specified length using a combination of lowercase
 * letters, uppercase letters, and numbers.
 * @param length - The `length` parameter is the desired length of the random password that you want to
 * generate.
 * @returns a randomly generated password of the specified length.
 */
function generateRandomPassword(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }

//   Optional: Hash the password for extra security.
//  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
 
  return password
}

module.exports = generateRandomPassword