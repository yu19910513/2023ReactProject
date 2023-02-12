const router = require('express').Router();
const testRoutes = require('./TestRoutes');
const userRoutes = require('./UserRoutes');

router.use('/user', userRoutes);
router.use("/test", testRoutes);
module.exports = router;
