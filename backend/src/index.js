const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); //defino que vou reseber dados no formato json
app.use(errors());
app.use(routes); //tenho acesso as rotas do arquivo routes

app.listen(8080);

