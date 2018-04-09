import jwt from 'jsonwebtoken'
import config from '../config'
import { Errors } from '../business/errors'
import InvalidToken from '../models/invalidToken'

/**
 * check user permission and role of the token and return user info
 * @param {*} token 
 * @param {*} role 
 * @param {*} permissionTag 
 * 
 */
const checkPermission = (token, role, permissionTag) => {
  if (config.noPermission) {
    return {
      username: "abc",
      role: "ADMIN"
    }
  }
  try {
    const invalidToken = InvalidToken.findOne({ token })
    if (invalidToken) {
      throw Errors.UNAUTHORIZED()      
    }
  } catch(err) {
    console.log(err)
    throw Errors.UNAUTHORIZED()
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    // console.log('decoded', decoded)
    //check the username and role for permission    
  } catch (err) {
    console.log('Error', err)
    //possible errors
    // err = { name: 'TokenExpiredError', message: 'jwt expired', expiredAt: 1408621000 }
    // err = { name: 'JsonWebTokenError', message: 'jwt malformed' //'jwt signature is required', 'invalid signature',...
    // }  
    throw Errors.UNAUTHORIZED()
  }
  const userRole = decoded.role
  const permissions = decoded.permissions

  if (role === 'ADMIN' && userRole !== role) {
    throw Errors.UNAUTHORIZED()
  }
  //admin is also a moderator
  if (role === 'MODERATOR') {
    if (userRole !== role && userRole !== 'ADMIN') {
      throw Errors.UNAUTHORIZED()
    }
    if (userRole === role && permissions.indexOf(permissionTag) < 0) {
      throw Errors.UNAUTHORIZED()
    }
  }
  if (role === 'VIEWER' && userRole !== role && userRole !== 'MODERATOR' && userRole !== 'ADMIN') {
    throw Errors.UNAUTHORIZED()
  }
  // other kind of authorization goes here....
  return decoded // user data
}

const removeUndefined = obj => Object.keys(obj).forEach(key => {
  if (obj[key] === undefined
    || key === 'skip'
    || key === 'limit'
    || key === 'sortByFields'
    || key === 'searchTerm'
    || key === 'searchName'
    || key === 'searchTitle'
    || key === 'searchId'
    || key === 'searchIdMatch'
    || key === 'searchUsername'
    || key === 'token')
    delete obj[key]
})

const getSortBy = s => s ? JSON.parse('{' + s.join(',').replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ') + '}') : {}

/**
 * set search argument for "name" field
 * @param {*} args 
 * @param {*} searchTerm 
 */
const setSearchTerm = (args, searchTerm) => {
  if (searchTerm && searchTerm.trim()) {
    args['name'] = { $regex: searchTerm, $options: 'i' }
  }
}

const setSearchId = (args, searchId) => {
  if (searchId && searchId.trim()) {
    args['_id'] = { $regex: searchId, $options: 'i' }
  }
}

const setSearchIdMatch = (args, searchIdMatch) => {
  if (searchIdMatch && searchIdMatch.trim()) {
    args['_id'] = { $eq: searchIdMatch}
  }
}

const setSearchUsername = (args, searchUsername) => {
  if (searchUsername && searchUsername.trim()) {
    args['username'] = { $regex: searchUsername, $options: 'i' }
  }
}


export {
  checkPermission,
  removeUndefined,
  getSortBy,
  setSearchTerm,
  setSearchId,
  setSearchIdMatch,
  setSearchUsername
}
