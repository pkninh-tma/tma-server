import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  // _id: Schema.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true
  },
  role: String, // ADMIN, MODERATOR, VIEWER
  permissions: [{ type: String }], // array of permission tags, each permission tag is a string of "MAILBOX", "CONTACT"
  password: String // hashed password  
}, { collection: 'user' })

const User = mongoose.model('User', userSchema)

export default User
