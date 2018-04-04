import mongoose from 'mongoose'

const Schema = mongoose.Schema

const documentSchema = new Schema({
  _id: {
    type: String,
    index: true,
    require: true
  },
  name: String,
  description: String,
  create_time: Number,
  status: String,
  url: String,
}, { collection: 'document' })

const Document = mongoose.model('Document', documentSchema)

export default Document
