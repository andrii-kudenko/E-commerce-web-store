const express = require('express')
const router = express.Router()

const {authCheck} = require('../middlewares/auth')
const {createPaymentIntent} = require('../controllers/stripe')


router.post('/create-payment-intent', authCheck, createPaymentIntent)

module.exports = router