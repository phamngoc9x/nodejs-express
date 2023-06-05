const Blogs = require('../models/Blog');
const {
  mongooseToObject,
  mutilpleMongooseToObject,
} = require('../../util/mongoose');

class NewsController {
  // [GET] /new
  index(req, res, next) {}

  // [GET] /new/:slug
  show(req, res, next) {
    Blogs.findOne({ slug: req.params.slug })
      .then((blog) => {
        res.render('news/show', { blog: mongooseToObject(blog) });
      })
      .catch(next);
  }
  // [GET] /new/create
  create(req, res, next) {
    res.render('news/create');
  }

  // [POST] /new/store
  store(req, res, next) {
    const blog = new Blogs(req.body);
    blog
      .save()
      .then(() => res.redirect('/news'))
      .catch((error) => {});
  }
}

module.exports = new NewsController();
