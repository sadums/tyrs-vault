const router = require('express').Router();

//database
const userRoutes = require('./user-routes');
const userGamesRoutes = require('./usergames-routes');
const userFriendsRoutes = require('./userfriends-routes');
const gameRoutes = require('./game-routes');

router.use('/user', userRoutes);
router.use('/usergames', userGamesRoutes);
router.use('/userfriends', userFriendsRoutes);
router.use('/game', gameRoutes);


//external apis
const rawgRoutes = require('./rawg-routes');
const steamRoutes = require('./steam-routes');

// proxy server to resolve CORS requests
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
router.use('/rawg', rawgRoutes);
router.use('/steam', steamRoutes);




module.exports = router;