import { addContact, updateContact, deleteContact, getContacts } from '../business/contact'
import { addMessage, updateMessage, deleteMessage, getMessages } from  '../business/message'
import { addMailbox, updateMailbox, deleteMailbox, getMailbox } from  '../business/mailbox'
import { login, logout } from '../auth'
import config from '../config'
import { checkRolePermision, verifyInvalidToken } from '../resolvers/util';
import InvalidToken from '../models/invalidToken'

var jwt = require('express-jwt');

const getToken = (req) => {
  // get from Header Or Query string
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

const isRevokedCallback = function(req, payload, done){
  const token = getToken(req)    

  InvalidToken.findOne({ token }, (err, tokenRevoked) => {
    if (err) { return done(err); }
    return done(null, !!tokenRevoked)
  })
};

module.exports = function (app, parser) {
  app.use(parser)
  app.use(jwt({ 
    secret: config.jwtSecret,
    isRevoked: isRevokedCallback
  })
    .unless({path: ['/graphql', '/graphiql', '/api/login']}));
  
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

  app.post('/api/login', _login);
  app.post('/api/logout', _logout);

  app.head('/api/ping', (req, res) => {
    res.status(200).send();
  })
}

// contact
const _createContact = async (req, res) => {
  // TODO check decoded token as req.user
  const { firstName, lastName, email, phone } = req.body
  const user = await checkUser(req, "add_contact");

  const result = await addContact(user)(firstName, lastName, email, phone)
  res.send(result);
}

const _getContact = async (req, res) => {
  const user = await checkUser(req, "get_contact");
  const result = await getContacts();
  res.send(result)
}

const _deleteContact = async (req, res) => {
  const user = await checkUser(req, "delete_contact");
  const { contactId } = req.params
  const result = await deleteContact(user)(contactId)
  res.send(result);
}

const _updateContact = async (req, res) => {
  const user = await checkUser(req, "update_contact");
  const { contactId } = req.params
  const { firstName, lastName, email, phone } = req.body
  const result = await updateContact(user)(contactId, { firstName, lastName, email, phone })
  res.send(result);
}

// message

const _createMessage = async (req, res) => {
  const { to, from, subject, createTime } = req.body
  const user = await checkUser(req, "add_message");

  const result = await addMessage(user)(to, from, subject, createTime)
  res.send(result);
}

const _getMessage = async (req, res) => {
  const user = await checkUser(req, "get_message");
  const result = await getMessages();
  res.send(result)
}

const _deleteMessage = async (req, res) => {
  const user = await checkUser(req, "delete_message");
  const { messageId } = req.params
  const result = await deleteMessage(user)(messageId)
  res.send(result);
}

const _updateMessage = async (req, res) => {
  const user = await checkUser(req, "update_message");
  const { messageId } = req.params
  const { from, to, subject, createTime } = req.body
  const result = await updateMessage(user)(messageId, { from, to, subject, createTime })
  res.send(result);
}

// mailbox

const _createMailbox = async (req, res) => {
  const { name } = req.body
  const user = await checkUser(req, "add_mailbox");

  const result = await addMailbox(user)(name)
  res.send(result);
}

const _getMailbox = async (req, res) => {
  const user = await checkUser(req, "get_mailbox");
  const result = await getMailbox();
  res.send(result)
}

const _deleteMailbox = async (req, res) => {
  const user = await checkUser(req, "delete_mailbox");
  const { mailboxId } = req.params
  const result = await deleteMailbox(user)(mailboxId)
  res.send(result);
}

const _updateMailbox = async (req, res) => {
  const user = await checkUser(req, "update_mailbox");
  const { mailboxId } = req.params
  const { name } = req.body
  const result = await updateMailbox(user)(mailboxId, { name })
  res.send(result);
}

const _login = async (req, res) => {
  const { username, password } = req.body
  const result = await login(username, password)
  res.send(result)
}

const _logout = async (req, res) => {
  const token = getToken(req)
  const result = await logout(token)
  res.send(result)
}

const checkUser = async (req, permission) => { 
  const { user } = req
  await checkRolePermision(user, permission)
  return user;
}