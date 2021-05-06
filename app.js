'use strict';

const createError = require('http-errors');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const handleBars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');

//Configuración de base de datos con Mongoose
const dbConfig = require('./config/db.js');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado'))
    .catch((err) => console.log(err));

//Configuración de rutas
const estudiantesRouter = require('./routes/EstudianteRouter');
const docentesRouter = require('./routes/DocenteRouter');

const app = express();
//Clave secreta
app.use(session({
    secret: 'cbtis75',
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', handleBars({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname:'hbs',
    helpers: {
        if_eq_string(a, b, opts) {
            if (a.toString() === b.toString()) {
                return opts.fn(this);
            }
            return opts.inverse(this);
        }
    }
}));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', estudiantesRouter);
app.use('/docentes', docentesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;