const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/news', siteController.news);
router.get('/', siteController.index);

module.exports = router;
