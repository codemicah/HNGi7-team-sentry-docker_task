const router = require("express").Router(),
            mongoose = require("mongoose"),
            User  = require("../models/users"),
            Auth = require("../config/Auth/auth"),
            pwdHash = require("../config/Auth/pwdHash");

router.use(require("body-parser").urlencoded({ extended: true }))
router.post("/register", (req, res)=>{
    if(mongoose.connection.readyState == 1){
        const username = req.body.username,
                    password = req.body.password;

        const auth = Auth();
        //Password-hash configurations
        const hashedPassword = pwdHash(password);

        const newUser = new User({
            username: username,
            password: hashedPassword,
            account_id: auth[0],
            key: auth[1]
        })
        User.create(newUser, (err, user) =>{
            if(err)
                console.log(err);
            res.status(200).json({
                status: "success",
                message: "Registration successful",
                data: {
                    username: user.username,
                    account_id: user.account_id,
                    "key/token": user.key
                }
            })
        })
    }
})

module.exports = router;