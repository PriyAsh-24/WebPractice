const mongoose=require("mongoose");

mongoose.connect(process.env.MONGODB);

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
