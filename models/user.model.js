const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    tasks:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      }
    ],
  },
 
);




module.exports = mongoose.model('User', userSchema);


