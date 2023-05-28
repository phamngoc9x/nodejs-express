const express = require("express");
const morgan = require("morgan");
const handlebars = require('express-handlebars').engine;

const path = require("path");
const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Http logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


// Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})