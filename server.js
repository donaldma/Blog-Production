const ENV = process.env.ENV || "development";
const express = require('express');  
const http = require('http'); 

const app = express();
const server = http.createServer(app);
const cors = require('cors');
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const bodyParser  = require("body-parser");
const router = express.Router();
const dbHelper = require("./lib/dbHelper")(knex);
const apiRoutes = require("./routes/api");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");

const session = require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
});

app.use(session);

app.use(cors());

app.use(knexLogger(knex));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

// app.set('views','./public/views');

app.get('/', (req, res) => {
  res.render(__dirname + '/public/views/index');
})

app.get('/category*', (req, res) => {
  res.render(__dirname + '/public/views/index');
})

app.get('/posts*', (req, res) => {
  res.render(__dirname + '/public/views/index');
})

app.use('/user', userRoutes(dbHelper));
app.use('/profile', profileRoutes(dbHelper));
app.use('/api', apiRoutes(dbHelper));

app.use('/404', (req, res, next) => {
  res.status(404).render('404');
})

app.use('/500', (req, res, next) => {
  res.status(500).render('500');
})

app.use((req, res, next) => {
  res.redirect('/404');
})

server.listen( process.env.PORT || 9001, () => {
  console.log('Server running');
});