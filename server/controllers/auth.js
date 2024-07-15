const User = require('../models/user')

exports.createOrUpdateUser = async (req, res) => {
    console.log('Got into create or update')
    // res.json({data: 'hey you hit create-or-update-user API endpoint',})

    const {name, picture, email} = req.user;
    console.log(`Email ${email} and name ${name}`)
    const user = await User.findOneAndUpdate({email:email}, {name:name, picture:picture}, {new:true, useFindAndModify: false})

    if (user) {
        console.log('USER UPDATED', user)
        res.json(user)
    } else {
        const newUser = await new User({
            email, name:email.split("@")[0], picture,
        }).save();
        console.log("USER CREATED", newUser)
        res.json(newUser);
    }
}

// find current user in our database, through email
exports.currentUser = async (req, res) => {
    User.findOne({email: req.user.email}).exec((err, user) => {
        if (err) throw new Error(err)
        res.json(user);
    })
}