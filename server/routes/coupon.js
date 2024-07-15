const express = require('express')
const router = express.Router()

// import middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')

// controller
const { create, remove, list } = require('../controllers/coupon')

// route
router.post('/coupon', authCheck, adminCheck, create)
router.get('/coupons', list)
router.delete('/coupon/:couponId', authCheck, adminCheck, remove)

module.exports = router