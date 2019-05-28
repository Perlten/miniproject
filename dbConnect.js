var mongoose = require('mongoose');

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open ');
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection closed ');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

async function disconnect(){
    return await mongoose.disconnect()
}

function connect(connectionString=require("./settings").TEST_DB_URI) {
  return mongoose.connect(connectionString, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
}

module.exports = {connect, disconnect};