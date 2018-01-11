// Asynchronous
const crypto = require('crypto').randomBytes(256).toString('hex');
module.exports={
    uri: 'mongodb://localhost:27017/passport-angular2',
    secret: crypto,
    db: 'passport-angular2'
}