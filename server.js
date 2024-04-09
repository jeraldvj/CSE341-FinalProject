const express = require('express');
const session = require('express-session');
const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');



app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});

app
.use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });