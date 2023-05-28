class NewsController {
  // [GET] /new
  index(req, res) {
    res.render('news');
  }

  // [GET] /new/slug
  show(req, res) {
    res.send('new detail');
  }
}

module.exports = new NewsController();
