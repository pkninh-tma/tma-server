import mongoose from 'mongoose'

const Schema = mongoose.Schema

const roleSchema = new Schema({
  // _id: Schema.ObjectId,
  name: String,
  permissions: [{
    type: String,
  }]
}, { collection: 'role' })

const Role = mongoose.model('Role', roleSchema)

export default Role
