const express = require('express')
const router = express.Router()

// import middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')

// controller
const { create, read, update, remove, list, getSubs } = require('../controllers/category')

// routes
router.post('/category', authCheck, adminCheck, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.put('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck, adminCheck, remove)
router.get('/category/subs/:_id', getSubs);

module.exports = router

// function myfunc(req, res) {
//     return res.json({data: 'hey you hit create-or-update-user API endpoint',})
// }