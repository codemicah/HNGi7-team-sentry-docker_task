const User = require("../Resources/database/user");
const jwt = require("jsonwebtoken");

exports.signup = async function(req, res, next) {
    //Use for signing up the user it create a new user on th mongo db
    try {
      console.log(`Reaching the sign up route`)
      let user = await User.create(req.body);
      let { id, username, profileImgUrl } = user;
    //   This create the authentication token that will later be added to
    // To the bearer token in each request
      let token = jwt.sign(
        {
          id,
          username
        },
        //Add a special key for verifying token
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        token
      });
    } catch (err) {
      if (err.code === 11000) {
        err.message = "Sorry, that username and/or email is taken";
      }
    //   This is for err handling i'm not aware of how you handle your error
      return next({
        status: 400,
        message: err.message
      });
    }
  };
  


  exports.login = async function(req,res,next){
      //This is for logging in the user it will return a token and the user info
    try{
      const foundUser = await User.findOne({
        username:req.body.username
      })
      let {id,username} = foundUser
    //   This is for comparing that the password received is similar to the
    // hashed password on the database
      let isMatch = await foundUser.comparePassword(req.body.password)
      if(isMatch){
        let token = jwt.sign({
         id,username
        },
        // set the secret key
        process.env.SECRET_KEY
        )
        return res.status(200).json({
          token,id,username
        })
      }else{
        return next({
          status:400,
          message:"Invalid Email/Password"
        })
      }
    }catch(e){
      return next({
        status:400,
        message:"Invalid Email/password"
      })
    }
  }