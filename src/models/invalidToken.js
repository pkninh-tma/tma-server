import mongoose from 'mongoose'

const Schema = mongoose.Schema

const invalidTokenSchema = new Schema({
  token: String,
}, { collection: 'invalidToken' })

const InvalidToken = mongoose.model('InvalidToken', invalidTokenSchema)

export default InvalidToken
