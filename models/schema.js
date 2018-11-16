
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    ip: {type: String},
    email: { type: String, required: true },
    hash: { type: String, required: false },
    requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }]
});

const requestSchema = mongoose.Schema({
  firstname:{ type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  year: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  repair: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
})

let User = mongoose.model('User', userSchema);
let Request = mongoose.model('Request', requestSchema);

module.exports = {User, Request};
