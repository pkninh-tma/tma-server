import Document from '../models/document'
import moment from 'moment'

const getDocuments = async (args, skip, limit, sortBy) => {
  const query = Document.find(args).sort(sortBy).skip(skip).limit(limit)
  const total_ = Document.find(args).count()
  const [result, total] = await Promise.all([query, total_])
  return { items: result, total }
}

const addDocument = admin_user => async (name, description, type, create_time, status) => {
  // console.log('file info', file)
  const doc = new Document({
    name, 
    description,
    type,
    create_time: create_time || moment().unix(),
    status
  })
  return doc.saveAsync()
}

const updateDocument = admin_user => async (_id, data) => {
  return Document
    .findByIdAndUpdateAsync(_id, { $set: data }, { new: true })
}

const deleteDocument = admin_user => _id => {
  return Document
    .findById(_id)
    .removeAsync()
}

export {
  addDocument,
  updateDocument,
  deleteDocument,
  getDocuments
}
