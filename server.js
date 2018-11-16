let express = require('express');
let app = express();
let bodyParser = require('body-parser')
let hostName = require('os').hostname();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs') // register the template engine

require('./routes')(app);

app.get('/', function(req,res){
  res.sendFile('index.html');
});

const {connectToMongo} = require('./lib/db');
connectToMongo()
    .then(()=>{
      let server = app.listen(3000, function () {
        let port = server.address().port;
        console.log('Example app listening at port %s', port);
      });
    })
    .catch((err)=>{
        console.log(err);
    });
