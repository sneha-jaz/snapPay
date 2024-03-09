const express = require("express");
const userRouter = require('./user');
const accountRounter = require('./account');

const router = express.Router(); 

router.use('/user', userRouter);
router.use('/account', accountRounter);

module.exports = router;
