import mongoose from 'mongoose'

const Schema = mongoose.Schema

const permissionSchema = new Schema({
  // _id: Schema.ObjectId,
  name: String,
}, { collection: 'permission' })

const Permission = mongoose.model('Permission', roleSchema)

export default Permission
