const mongoose=require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/webPractice');

let userSchema = new mongoose.Schema({
    name: {
        type : String
    },
    username: {
        type : String,
    },
    email: {
        type : String
    },
    password: {
        type : String,
    },
    date:{
      type: Date,
      default: Date.now
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  });

module.exports = mongoose.model('User',userSchema);