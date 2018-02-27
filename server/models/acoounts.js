const mongoose = require('mongoose');
const {Schema}= mongoose;

const account = new Schema({
    username:String,
    password:String,
    facebookid:String
});

const Account = mongoose.model('account',account);

module.exports = Account;