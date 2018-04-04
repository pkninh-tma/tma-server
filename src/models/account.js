import mongoose from 'mongoose'

const Schema = mongoose.Schema

const accountSchema = new Schema({
  _id: {
    type: String,
    required: true,
    index: true
  },
  name: String,
  investor_id: {
    type: String,
    ref: 'Investor',
    index: true
  },
  create_time: Number,
}, { collection: 'account' })

const Account = mongoose.model('Account', accountSchema)

export default Account
