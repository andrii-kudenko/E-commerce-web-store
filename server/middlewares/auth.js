const admin = require('../firebase')
const User = require("../models/user")

exports.authCheck = async (req, res, callback) => {
    // console.log(req.headers) // token
    // callback()

    try {
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
        // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser)
        req.user = firebaseUser
        callback();
        console.log('Calling callback')
    } catch (err) {
        console.log(err)
        res.status(401).json({
            err: "Invalid or expired token",
        })
    }

}

exports.adminCheck = async (req, res, callback) => {
    const {email} = req.user
    // User.findOne({email: req.user.email}).exec((err, user) => {
    const adminUser = await User.findOne({email}).exec()
    if (adminUser.role !== 'admin') {
        res.status(403).json({
            err: "Admin resource. Access denied",
        })
    } else {
        callback()
    }
}