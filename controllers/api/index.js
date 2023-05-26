const router = require('express').Router();

const userRoutes = require('./user-routes');
const rawgRoutes = require('./rawg-routes');
const steamRoutes = require('./steam-routes');

router.use('/user', userRoutes);
router.use('/rawg', rawgRoutes);
router.use('/steam', steamRoutes);

module.exports = router;