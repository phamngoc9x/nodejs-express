const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
var methodOverride = require('method-override');

const db = require('./config/db');

// Contect to DB
db.connect();

const path = require('path');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Http logger
app.use(morgan('combined'));

// Apply custom middleware
app.use(SortMiddleware);

// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'oi-elevator',
          asc: 'oi-sort-ascending',
          desc: 'oi-sort-descending',
        };
        const icon = icons[sortType];

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };
        const type = types[sortType];
        return `<a href="?_sort&column=${field}&type=${type}"><span class="oi ${icon}"></span></a>`;
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
