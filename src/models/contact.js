import mongoose from 'mongoose'

const Schema = mongoose.Schema

const contactSchema = new Schema({
  // _id: Schema.ObjectId,
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  user_id: {
    type: String,
    ref: 'User',
    index: true
  },
}, { collection: 'contact' })

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
