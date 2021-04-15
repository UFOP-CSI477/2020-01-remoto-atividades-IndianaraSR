const mongoose = require('mongoose');
const dotenv = require("dotenv");
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand(myEnv);

mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => { console.log('Conectado com BD')})
.catch((err) => {console.log('Error', err)});

module.exports = mongoose;