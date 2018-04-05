import Contact from '../models/contact'
// import moment from 'moment'

const getContacts = async (args, skip, limit, sortBy) => {
  const query = Contact.find(args).sort(sortBy).skip(skip).limit(limit)
  const total_ = Contact.find(args).count()
  const [result, total] = await Promise.all([query, total_])
  return { items: result, total }
}

const addContact = admin_user => async (firstName, lastName, email, phone) => {
  const contact = new Contact({
    firstName, lastName, email, phone
  })
  return contact.saveAsync()
}

const updateContact = admin_user => async (_id, data) => {
  return Contact
    .findByIdAndUpdateAsync(_id, { $set: data }, { new: true })
}

const deleteContact = admin_user => _id => {
  return Contact
    .findById(_id)
    .removeAsync()
}

export {
  addContact,
  updateContact,
  deleteContact,
  getContacts
}
