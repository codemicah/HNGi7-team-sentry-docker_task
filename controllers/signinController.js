const router = require("express").Router(),
            User = require("../models/users"),
            passwordHash = require("password-hash");

router.post("/signin", (req, res) =>{
    const username = req.body.username
    User.findOne({
        username: username
    }, (err, user)=>{
        if (err){
            res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        }else{
            var hashedPassword = user.password;
            checkPwd = passwordHash.verify(req.body.password, hashedPassword);

            if(checkPwd == true){
                user.password= undefined
                res.status(200).json({
                    status: "success",
                    message: "Login successful",
                    data:{
                        user
                    }
                })
            }else{
                 res.status(401).json({
                     status: "fail",
                     message: "Authentication failed"
                 })
            }
        }
    })
})

module.exports = router;