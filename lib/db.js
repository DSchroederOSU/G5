const MongoClient = require( 'mongodb' ).MongoClient;
const mongoose = require('mongoose');

module.exports.connectToMongo = function() {
    return new Promise((resolve, reject) => {
        const mongoHost = process.env.MONGO_HOST || 'localhost';
        const mongoDatabase = process.env.MONGO_DATABASE || 'repairs';
        const mongoUser = process.env.MONGO_USER || 'user';
        const mongoPassword = process.env.MONGO_PASSWORD || 'password';
        const mongoPort = process.env.MONGO_PORT || 27017;
        const mongoURL = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;

        mongoose.connect(mongoURL)
            .then((db) => {
                console.log("== MongoDB database...connected");
                resolve();
            })
            .catch((err)=>{
                reject(err);
            } );
    });
}
