var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const klientRouter = require('./routes/klientRoute');
const samochodRouter = require('./routes/samochodRoute');
const wynajecieRouter = require('./routes/wynajecieRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });
var app = express();

const SamochodApiRouter = require('./routes/api/SamochodApiRoute');
const KlientApiRouter = require('./routes/api/KlientApiRoute');
const WynajecieApiRouter = require('./routes/api/WynajecieApiRoute');

app.locals.daysBetween = (date1, date2) => {
    var year1 = parseInt(date1[0] + date1[1] + date1[2] + date1[3]);
    var year2 = parseInt(date2[0] + date2[1] + date2[2] + date2[3]);
    var month1 = parseInt(date1[5] + date1[6]);
    var month2 = parseInt(date2[5] + date2[6]);
    var day1 = parseInt(date1[8] + date1[9]);
    var day2 = parseInt(date2[8] + date2[9]);

    for (let i = 1; i <= month1; i++) {
        day1 += new Date(year1, i, 0).getDate();
    }
    for (let i = 1; i <= month2; i++) {
        day2 += new Date(year2, i, 0).getDate();
    }

    return day2 - day1;
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
////////////////////////////////////////////////////////////
//Tam wyżej jest parsowanie body, wszytskie nasz app.use muszą być pod tym!!
////////////////////////////////////////////////////////////

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use('/api/samochod', SamochodApiRouter);
app.use('/api/klient', KlientApiRouter);
app.use('/api/wynajecie', WynajecieApiRouter);

app.use('/', indexRouter);
app.use('/klient', klientRouter);
app.use('/samochod', samochodRouter);
app.use('/wynajecie', wynajecieRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.render('error');
});


module.exports = app;
