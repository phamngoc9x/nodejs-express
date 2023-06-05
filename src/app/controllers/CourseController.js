const Courses = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
  // [GET] /course
  index(req, res) {
    res.render('courses');
  }

  // [GET] /course/:slug
  show(req, res, next) {
    Courses.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: mongooseToObject(course) });
      })
      .catch(next);
  }
  // [GET] /course/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /new/store
  store(req, res, next) {
    const course = new Courses(req.body);
    course
      .save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch((error) => {});
  }

  // [GET] /course/:id/edit
  edit(req, res, next) {
    Courses.findById(req.params.id)
      .then((course) => {
        res.render('courses/edit', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [PUT] /course/:id
  update(req, res, next) {
    Courses.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }
  // [DELETE] /course/:id
  destroy(req, res, next) {
    Courses.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /course/:id/restore
  restore(req, res, next) {
    Courses.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /course/:id/force
  forceDestroy(req, res, next) {
    Courses.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  // [POST] /course/handle-form-actions
  handleFormActions(req, res, next) {
    console.log(req.body.action);
    switch (req.body.action) {
      case 'delete':
        Courses.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'deleteDb':
        Courses.deleteOne({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restore':
        Courses.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action invalid' });
    }
  }
}

module.exports = new CourseController();
