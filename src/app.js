const express = require('express')
const app = express()
const config = require('./config')
const morgan = require('morgan')

app.set('port',process.env.PORT||4300)
app.set('view engine','ejs')


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(require ('./routes/citas.routes'));
app.use(require('./routes/cliente.routes'));
module.exports = app;