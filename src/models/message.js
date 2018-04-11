import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  // _id: Schema.ObjectId,
  from: String,
  to: String,
  subject: String,
  user_id: {
    type: String,
    ref: 'User',
    index: true
  },
  create_time: Number,
  status: String
}, { collection: 'message' })

const Message = mongoose.model('Message', messageSchema)

export default Message
