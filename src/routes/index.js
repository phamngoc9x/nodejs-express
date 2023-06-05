const meRouter = require('./me');
const coursesRouter = require('./courses');
const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
  app.use('/me', meRouter);
  app.use('/courses', coursesRouter);
  app.use('/news', newsRouter);
  app.use('/', siteRouter);
}

module.exports = route;
