const bcrypt = require('bcrypt');

const hash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject(err)
      } else {
        // Store hash in database
        resolve(hash)
      }
    });
  })
}

const verify = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, res) {
      if (res) {
        // Passwords match
        resolve(true)
      } else {
        // Passwords don't match
        reject('Password don\'t match')
      }
    });
  })
}

export { hash, verify }