const mongoose = require("mongoose")
const Database = require('./database')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username:{

    },
    password:{

    },
    database:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Database"
        }
    ]
})

userSchema.pre("save",async function(next){
    try{
        if(!this.isModified("password")){
            return next()
        }
        let hashedPassword = await bcrypt.hash(this.password,10)
        this.password = hashedPassword
        return next()
    }catch(e){
        console.log(e)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword,next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model("User",userSchema)

module.exports = User