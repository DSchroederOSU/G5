let path = require("path");
let emailService = require('./lib/emailService')
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const User = require('./models/schema').User;


module.exports = function(app){
  app.post('/', function(req,res){

    emailService.sendLink(req.body.email)
    .then(()=>{
      res.status(200).redirect('/success')
    })
    .catch((err)=>{
      console.log(err)
    })
  });

  app.post('/repair', function(req, res, next){
    console.log(req.body)
    let repairObject = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      repair: req.body.repair,
      date: req.body.date,
      time: req.body.time
    }

    let mailOptions={
       to : req.body.email,
       subject : 'Greetings',
       text : `http://localhost:3000/info`
    }
    emailService.smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
        res.end("error");
      }else{
        console.log(response)
        console.log("Message sent: " + response);
        res.end("sent");
      }
    });
  });

  app.get('/info/:hash', function(req,res){
    // hash param is used to cross reference user on time of created user

    res.sendFile(path.join(__dirname, '/public', 'info.html'));
  });
  app.post('/info/:hash', function(req,res){
    // hash param is used to cross reference user on time of created user
    User.find({hash: req.params.hash})
    .then((user)=>{
        let ip = req.connection.remoteAddres;
    })
    .catch((err)=>{
          console.log(err);
    });
    res.sendFile(path.join(__dirname, '/public', 'info.html'));
  });




  app.get('/success', function(req,res){
    res.sendFile(path.join(__dirname, '/public', 'wait.html'));
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
