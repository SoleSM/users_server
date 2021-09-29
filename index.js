const express = require('express')
require('dotenv').config();
const morgan = require('morgan');

require('./connection');
const app = express();

// Middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setttings
app.set('port', process.env.PORT || 3000);

// Routes
app.use('/users',require('./routes/users.routes'));
app.use('/users/auth',require('./routes/auth.routes'));
 
app.listen(app.get('port'), ()=> console.log(`Server on port ${app.get('port')}`))