const router = require('express').Router();
const usrRoutes = require('./user-routes');
const thtRoutes = require('./thought-routes');

router.use('/users', usrRoutes);
router.use('/thoughts', thtRoutes);

module.exports = router;