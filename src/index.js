const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://gabriel:raikou123@cluster0-btknk.mongodb.net/devRadar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(express.json()); // o método "use" deixa a config válida para todas as rotas
app.use(routes);

app.get('/users');

app.listen(3333);