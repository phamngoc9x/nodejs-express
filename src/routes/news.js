const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.post('/store', newsController.store);
router.get('/create', newsController.create);
router.get('/:slug', newsController.show);
router.get('/news', newsController.index);

module.exports = router;
