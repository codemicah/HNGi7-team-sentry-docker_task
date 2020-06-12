const User = require("../../models/users");

module.exports = Authenticate = (req, res, next) =>{
    const key = req.query.key,
                id = req.query.id
    if(key && id !== undefined){
        User.findOne({
            account_id: req.query.id
        }, (err, user) => {
            if (!err && user != null) {
                if (user.key === req.query.key) {
                    return next();
                } else {
                    res.status(403).json({
                        status: "Forbidden",
                        message: "Invalid Key"
                    })
                }
            } else {
                res.status(404).json({
                    status: "Not Found",
                    message: "Invalid Account ID"
                    /// I AM CURRENTLY WORKING HERE
                })
            }
        })
    }else{
        //This will run if account ID or key is empty or undefined
        res.status(401).json({
            status: "Unauthenticated",
            message: "Account ID or Key cannot be empty"
        })
    }
}