import { addContact, updateContact, deleteContact, getContacts } from '../business/contact'
import { addMessage, updateMessage, deleteMessage, getMessages } from  '../business/message'
import { addMailbox, updateMailbox, deleteMailbox, getMailboxes } from  '../business/mailbox'

module.exports = function (app) {
  // contact

  app.post('/api/contact', _createContact);

  app.get('/api/contact', _getContact);

  app.put('/api/contact/:contactId', _updateContact);

  app.delete('/api/contact/:contactId', _deleteContact);

  // messsage

  app.post('/api/message', _createMessage);

  app.get('/api/message', _getMessage);

  app.put('/api/message/:messageId', _updateMessage);

  app.delete('/api/message/:messageId', _deleteMessage);

  // mailbox

  app.post('/api/mailbox', _createMailbox);

  app.get('/api/mailbox', _getMailbox);

  app.put('/api/mailbox/:mailboxId', _updateMailbox);

  app.delete('/api/mailbox/:mailboxId', _deleteMailbox);
}

//TODO: check permission for all apis

// contact
const _createContact = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body
  const user = getUser();

  const result = await addContact(user)(firstName, lastName, email, phone)
  res.send(result);
}

const _getContact = async (req, res) => {
  const user = getUser();
  const result = await getContacts();
  res.send(result)
}

const _deleteContact = async (req, res) => {
  const user = getUser();
  const { contactId } = req.params
  const result = await deleteContact(user)(contactId)
  res.send(result);
}

const _updateContact = async (req, res) => {
  const user = getUser();
  const { contactId } = req.params
  const { firstName, lastName, email, phone } = req.body
  const result = await updateContact(user)(contactId, { firstName, lastName, email, phone })
  res.send(result);
}

// message

const _createMessage = async (req, res) => {
  const { to, from, subject, createTime } = req.body
  const user = getUser();

  const result = await addMessage(user)(to, from, subject, createTime)
  res.send(result);
}

const _getMessage = async (req, res) => {
  const user = getUser();
  const result = await getMessage();
  res.send(result)
}

const _deleteMessage = async (req, res) => {
  const user = getUser();
  const { messageId } = req.params
  const result = await deleteMessage(user)(messageId)
  res.send(result);
}

const _updateMessage = async (req, res) => {
  const user = getUser();
  const { messageId } = req.params
  const { from, to, subject, createTime } = req.body
  const result = await updateMessage(user)(messageId, { from, to, subject, createTime })
  res.send(result);
}

// mailbox

const _createMailbox = async (req, res) => {
  const { name } = req.body
  const user = getUser();

  const result = await addMailbox(user)(name)
  res.send(result);
}

const _getMailbox = async (req, res) => {
  const user = getUser();
  const result = await getMailbox();
  res.send(result)
}

const _deleteMailbox = async (req, res) => {
  const user = getUser();
  const { mailboxId } = req.params
  const result = await deleteMailbox(user)(mailboxId)
  res.send(result);
}

const _updateMailbox = async (req, res) => {
  const user = getUser();
  const { mailboxId } = req.params
  const { name } = req.body
  const result = await updateMailbox(user)(mailboxId, { name })
  res.send(result);
}


const getUser = () => { }