const router = require('express').Router();

const api = require('./api');
const main = require('./main');

router.use('/', main);
router.use('/api', api);

module.exports = router