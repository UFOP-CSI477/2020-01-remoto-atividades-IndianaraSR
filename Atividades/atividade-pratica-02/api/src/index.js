const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

require('./controllers/usersController')(app);
require('./controllers/equipmentController')(app);
require('./controllers/manutencaoController')(app);

app.listen(5000);