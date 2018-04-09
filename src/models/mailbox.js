import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mailboxSchema = new Schema({
  // _id: Schema.ObjectId,
  name: String
}, { collection: 'mailbox' })

const Mailbox = mongoose.model('Mailbox', mailboxSchema)

export default Mailbox
