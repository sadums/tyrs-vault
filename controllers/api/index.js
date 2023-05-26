const router = require('express').Router();

const userRoutes = require('./user-routes');
const rawgRoutes = require('./rawg-routes');
const steamRoutes = require('./steam-routes');


// proxy server to resolve CORS requests
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

router.use('/user', userRoutes);
router.use('/rawg', rawgRoutes);
router.use('/steam', steamRoutes);

module.exports = router;