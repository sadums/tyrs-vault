const router = require('express').Router();

//database
const userRoutes = require('./user-routes');
const userFriendsRoutes = require('./userfriends-routes');
const gameRoutes = require('./game-routes');
const userProfileRoutes = require('./user-profile');
const seedRoutes = require('./seed')

router.use('/user', userRoutes);
router.use('/userfriends', userFriendsRoutes);
router.use('/game', gameRoutes);
router.use('/user-profile', userProfileRoutes);
router.use('/seed', seedRoutes);


//external apis
const rawgRoutes = require('./rawg-routes');
const steamRoutes = require('./steam-routes');
const chessRoutes = require('./chess-routes');
const fortniteRoutes = require('./fortnite-routes')

// proxy server to resolve CORS requests
// router.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
router.use('/fortnite', fortniteRoutes)
router.use('/chess', chessRoutes);
router.use('/rawg', rawgRoutes);
router.use('/steam', steamRoutes);




module.exports = router;