let path = require("path");
let emailService = require('./lib/emailService')
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const User = require('./models/schema').User;
const Request = require('./models/schema').Request;
const mongoose = require('mongoose');

module.exports = function(app){

  // send email to client to create a repair request
  app.post('/', function(req,res){
    emailService.sendLink(req.body.email)
    .then(()=>{
      res.status(200).redirect('/success')
    })
    .catch((err)=>{
      console.log(err)
    })
  });

  // send user to repair form from email link
  app.get('/info/:hash', checkForRequestMade, function(req,res){
    // hash param is used to cross reference user on time of created user
    res.sendFile(path.join(__dirname, '/public', 'info.html'));
  });


  // form submit for request
  app.post('/info/:hash', checkForRequestMade, function(req,res){

    // create new request from form options
    let new_request = createRequest(req);
    new_request.save(function (err, repair) {
        if (err) {
            console.log(err);
        }
        else {
          // find user based on secret URL hash and update IP address, request array
          User.findOneAndUpdate({hash: req.params.hash},
            {
              $set: {'ip' : req.connection.remoteAddress},
              $push: {requests: repair}
            },
            {new: true},
            (err, user) => {
              if (err) {
                  console.log("Something wrong when updating data!");
              }
              else{
                let mailOptions={
                   to : user.email,
                   subject : 'Request Successful',
                   text : `Thank you for making a repair reuqest with us! To access your request, go to: http://localhost:3000/info/${req.params.hash}`
                }
                emailService.smtpTransport.sendMail(mailOptions, function(error, response){
                  if(error){
                    res.end("error");
                  }else{
                    res.status(200).redirect('/confirm');
                  }
                });
              }
          });
        }
      });
  });

  app.get('/confirm', function(req,res){
    res.sendFile(path.join(__dirname, '/public', 'repairsuccess.html'));
  });

  app.post('/rate', function(req, res){ 
    res.sendFile(path.join(__dirname, '/public', 'ratesuccess.html'));
  });


  app.get('/request/:id', function(req,res){
    User.find({_id: req.params.id})
      .populate({ path: 'requests'})
      .exec()
      .then((user)=>{
          if(user){
            // if the user has already made a request, return it
            if(user[0].requests.length > 0){
              console.log(user[0].requests[0])
              res.render('repair', { repair: user[0].requests[0] })
            } else {
              next();
            }
          } else {

          }
      })
      .catch((err)=>{
          console.log(err);
      });
  });

  app.get('/success', function(req,res){
    res.sendFile(path.join(__dirname, '/public', 'wait.html'));
  });

  // Catch all
   app.use('*', function (req, res){
       res.status(404).redirect(`/`)
   });
}
//validation middleware

let validatephone = (res, req, next) => {
  console.log(req.body)
  var phoneno = /([0-9]{3})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(req.body.phone.value.match(phoneno)) {
    return next;
  }
  else {
    alert("message");
    return res.status(401).end();
  }
}

// middleware to see if user has already made a request
function checkForRequestMade(req, res, next) {
  User.find({hash: req.params.hash})
    .populate({ path: 'requests'})
    .exec()
    .then((user)=>{
        if(user){
          // if the user has already made a request, return it
          if(user[0].requests.length > 0){
            res.status(200).redirect(`/request/${user[0]._id}`)
          } else {
            next();
          }
        } else {
          res.sendFile(path.join(__dirname, '/public', 'index.html'));
        }
    })
    .catch((err)=>{
        console.log(err);
    });

}

let createRequest = (req) => {
  let new_request = new Request();
  new_request.firstname = req.body.firstname;
  new_request.lastname = req.body.lastname;
  new_request.phone = req.body.phone;
  new_request.year = req.body.year;
  new_request.make = req.body.make;
  new_request.model = req.body.model;
  new_request.repair = req.body.repair;
  new_request.date = req.body.date;
  new_request.time = req.body.time;
  return new_request;
}
