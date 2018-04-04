import mongoose from 'mongoose'

const Schema = mongoose.Schema

const exchangeRateSchema = new Schema({
  _id: {
    type: String,
    index: true,
    require: true
  },
  from_currency: { // USD, CAN
    type: String, 
    required: true,
  },
  to_currency: { // VND
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    default: 1
  },
  date: Number
}, { collection: 'exchange_rate' })

const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema)

export default ExchangeRate
