import Mailbox from '../models/mailbox'

const getMailboxes = async (args, skip, limit, sortBy) => {
  const query = Mailbox.find(args).sort(sortBy).skip(skip).limit(limit)
  const total_ = Mailbox.find(args).count()
  const [result, total] = await Promise.all([query, total_])
  return { items: result, total }
}

const addMailbox = admin_user => async (name) => {
  const mailbox = new Mailbox({
    name
  })
  return mailbox.saveAsync()
}

const updateMailbox = admin_user => async (_id, data) => {
  return Mailbox
    .findByIdAndUpdateAsync(_id, { $set: data }, { new: true })
}

const deleteMailbox = admin_user => _id => {
  return Mailbox
    .findById(_id)
    .removeAsync()
}

export {
  addMailbox,
  updateMailbox,
  deleteMailbox,
  getMailboxes
}
