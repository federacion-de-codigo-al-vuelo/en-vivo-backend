const crypto = require('crypto');

const randomString = () => crypto.randomBytes(6).hexSlice();

module.exports = randomString
