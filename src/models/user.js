import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: { 
    type: String,
    index: true,
    unique: true,
    required: true
  },
  role: String, // ADMIN, MODERATOR, VIEWER
  permissions: [{ type: String }], // array of permission tags, each permission tag is a string of "MAILBOX", "CONTACT"
  password: String // hashed password  
}, { collection: 'user' })

userSchema.virtual('username').get(function(){
  return this._id
});

const User = mongoose.model('User', userSchema)

export default User
