if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');


const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
// just to shorten the case like "mongoose.connection.on" into "db.on"
db.on("error", console.error.bind(console, "connection error:"));
// on and once method are similar to then an catch
// In this case, if there is an error, the on callback would run which would result into printing the error in console
db.once("open", () => {
// It is the callback to be executed when the given event is generated. In our case, the function will be called when the connection to mongodb is open i.e. the connection is successful.
    console.log("Database connected");
});

const app = express();

// here are configuration for apps
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// here are middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// check more at http://www.passportjs.org/docs/downloads/html/
passport.use(new LocalStrategy(User.authenticate()));
// authenticate is already built in passport-local-mongoose
// check more at https://www.npmjs.com/package/passport-local-mongoose

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// the above two are also built in passport-local-mongoose

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // this is about login logout, check Section51
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req, res, next) => {
   next(new ExpressError('Page Not Found', 404))
})
// app.all stands for every single requiest. * stands for every path

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    // "500" is default
    if (!err.message) err.message = 'oh no something went wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
