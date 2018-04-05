import Message from '../models/message'
import moment from 'moment'

const getMessages = async (args, skip, limit, sortBy) => {
  const query = Message.find(args).sort(sortBy).skip(skip).limit(limit)
  const total_ = Message.find(args).count()
  const [result, total] = await Promise.all([query, total_])
  return { items: result, total }
}

const addMessage = admin_user => async (from, to, subject, create_time, type) => {
  const doc = new Message({
    from, 
    to,
    subject,
    create_time: create_time || moment().unix(),
    type
  })
  return doc.saveAsync()
}

const updateMessage = admin_user => async (_id, data) => {
  return Message
    .findByIdAndUpdateAsync(_id, { $set: data }, { new: true })
}

const deleteMessage = admin_user => _id => {
  return Message
    .findById(_id)
    .removeAsync()
}

export {
  addMessage,
  updateMessage,
  deleteMessage,
  getMessages
}
