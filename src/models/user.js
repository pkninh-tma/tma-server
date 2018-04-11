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
  password: String // hashed password  
}, { collection: 'user' })

const User = mongoose.model('User', userSchema)

export default User
