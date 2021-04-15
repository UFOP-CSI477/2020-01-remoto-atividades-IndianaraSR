const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

require('./controllers/authController')(app);
require('./controllers/sindromeController')(app);
require('./controllers/covidController')(app);
require('./controllers/adminController')(app);

app.listen(5000);