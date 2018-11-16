let chai = require('chai');
let chaiHttp = require('chai-http');
let routes = require('../routes');
let server = require('../server');
chai.use(chaiHttp);
let expect = chai.expect;
const mongoose = require('mongoose');
const User = require('../models/schema').User;
const Request = require('../models/schema').Request;

describe('Database Tests', function() {
  before(function (done) {
    const mongoHost = process.env.MONGO_HOST || 'localhost';
    const mongoDatabase = process.env.MONGO_DATABASE || 'repairs';
    const mongoUser = process.env.MONGO_USER || 'user';
    const mongoPassword = process.env.MONGO_PASSWORD || 'password';
    const mongoPort = process.env.MONGO_PORT || 27017;
    const mongoURL = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;

    mongoose.connect(mongoURL)
        .then((db) => {
            console.log("== MongoDB database...connected");
            done();
        })
        .catch((err)=>{
            console.log(err);
            done();
        } );
  });
  describe('/GET root', () => {
      it('it should return a email web form', (done) => {

        chai.request(server)
            .get('/')
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.html;
            done();
            });
      });
    });
    describe('/POST root', () => {
      //Save object with 'name' value of 'Mike"
      it('it should return 200', (done) => {
        this.timeout(5000);
        chai.request(server)
          .post('/')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({email: 'test@email.com'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });// end post root

    describe('/get info web form from secret link user hash', () => {
      //Save object with 'name' value of 'Mike"
      it('it should return a email web form', (done) => {

        // get the user hash code from who submitted form in past test
        // 1 entry in DB
        User.find({}, function (err, docs) {
          chai.request(server)
            .get(`/info/${docs[0].hash}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.html;
              done();
            });
        });
      });
    });

    describe('/post info web form from secret link user hash', () => {
      //Save object with 'name' value of 'Mike"
      it('it should return a email web form', (done) => {

        // get the user hash code from who submitted form in past test
        // 1 entry in DB
        User.find({}, function (err, docs) {
          chai.request(server)
            .post(`/info/${docs[0].hash}`)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
              firstname : 'Johnny',
              lastname : 'Apple',
              phone : '888-888-8888',
              year : '1996',
              make : 'Toyota',
              model : 'Camry',
              repair : 'Broken CV Joint',
              date : 'Monday',
              time : '2:00'
            })
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.html;
              done();
            });
        });
      });
    });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});//end db tests

describe('/get confirm', () => {
  //Save object with 'name' value of 'Mike"
  it('it should return a email web form', (done) => {
    chai.request(server)
      .get(`/confirm`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
    });
  });
});

describe('/post rate', () => {
  //Save object with 'name' value of 'Mike"
  it('it should return a email web form', (done) => {
    chai.request(server)
      .post(`/rate`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({rating: '5'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
    });
  });
});
