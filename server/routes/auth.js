const express = require('express')
const router = express.Router()

// import middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')

// controller
const { createOrUpdateUser, currentUser } = require('../controllers/auth')

// route
router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router

// function myfunc(req, res) {
//     return res.json({data: 'hey you hit create-or-update-user API endpoint',})
// }