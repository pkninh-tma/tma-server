import mongoose from 'mongoose'

const Schema = mongoose.Schema

const investorSchema = new Schema({
  _id: {
    type: String,
    index: true,
    require: true
  },
  name: String,
  email: String,
  address: String,
  create_time: Number,
  accounts: [
    {
      type: String,
      ref: 'Account'
    }
  ]
}, { collection: 'investor' })

const Investor = mongoose.model('Investor', investorSchema)

export default Investor
