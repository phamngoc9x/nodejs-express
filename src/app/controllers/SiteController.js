const Blog = require('../models/Blog');
const Course = require('../models/Course');
const { mutilpleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  // [GET] /home
  index(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render('home', { courses: mutilpleMongooseToObject(courses) }),
      )
      .catch((err) => next(err));

    // res.render('home');
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }

  news(req, res) {
    Blog.find({})
      .then((blogs) =>
        res.render('news/index', { blogs: mutilpleMongooseToObject(blogs) }),
      )
      .catch((err) => next(err));
  }
}

module.exports = new SiteController();
