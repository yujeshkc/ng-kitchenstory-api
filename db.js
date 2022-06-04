var mongoose = require('mongoose');
var commonConfig = require('./config.json');

let Host = commonConfig.DBURL + commonConfig.DB;
process.env.NODE_ENV = commonConfig.ENV || "production";
// const options = {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true 
// };

mongoose.connect(Host);

module.exports = mongoose;