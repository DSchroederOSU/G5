const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/schema').User;


module.exports = {

  // set up an email for sending out links
  smtpTransport : nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: true,
    auth: {
        user: 'g5autorepairapp@gmail.com',
        pass: 'B6WiEJcUAozERCgQsZTQnnBs'
    }
  }),
  sendLink : (email) => {
    return new Promise((resolve, reject) => {

      //create a random access string
      // this is appended to the link to cross-reference user
      let buf = (Math.random()*1e32).toString(36); 
      // create new user
      let new_user = new User();
      new_user.email = email;
      new_user.hash = buf;
      new_user.ip = '';
      new_user.save(function (err, user) {
          if (err) {
              console.log(err)
              reject(err)
          }
          else {
            let mailOptions={
               to : email,
               subject : 'Greetings',
               text : `http://localhost:3000/info/${buf}`
            }
            module.exports.smtpTransport.sendMail(mailOptions, function(error, response){
              if(error){
                reject(error)
              }else{
                resolve()
              }
            });
          }
      });
    });

  }

}
