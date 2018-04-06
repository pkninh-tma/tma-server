import express from 'express'
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { schema } from './schema'
import config from './config'
const path = require('path');

const HTTPStatus = require('http-status');
// const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)

const server = express()

// mongoose.Promise = global.Promise
const Promise = require('bluebird');
mongoose.Promise = Promise
Promise.promisifyAll( mongoose );

mongoose.connection.openUri(config.MONGO_URL)
  .once('open', () => console.log('Connected to MongoDB database!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

// server.use('*', cors({ origin: 'http://localhost:3000' }))
server.use('*', cors())

// server.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true },
//   store: new MongoStore({ url: config.MONGO_URL }),
//   rolling: true,
//   saveUninitialized: false,
//   httpOnly: true,
//   cookie: {
//     maxAge: 60000 * 60 * 24 * 7 // 1 week
//   }
// }))

// pp.post('/graphql', 
// jwt({secret: jwtSecret, credentialsRequired: false}), httpGraphQLHandler);
// const httpGraphQLHandler = async (req, res) => {
//   const {query, variables, ...rootVals} = req.body;
//   const authToken = req.user || {};
//   const result = await graphql(Schema, query, {authToken, ...rootVals}, variables);
//   res.send(result);
// }

const buildOptions =  (req, res) => {
  const auth = req.headers.authorization;
  const token = auth ? auth.substring(7) : undefined;
  return {
    schema,
    context: { token },
    formatError: error => ({
      message: error.message,
      code: error.originalError && error.originalError.code,
      locations: error.locations,
      path: error.path,
    })  
  }
};

server.use('/graphql', 
  bodyParser.json(),  
  graphqlExpress(buildOptions),
)

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

//RESTful APIs
require('./rest/rest')(server, bodyParser.json());

// server.use('/', express.static('public'))
// server.use(express.static(path.resolve(__dirname, '..', 'public')));

// server.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
// });

server.listen(config.PORT, () =>
  console.log(`Server is now running on http://localhost:${config.PORT}`)
)

