const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    }
    
}, { timestamps: true})

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })


userSchema.methods = {

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;  //this will return true or false
    },



    securePassword : function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}





module.exports = mongoose.model("User", userSchema)