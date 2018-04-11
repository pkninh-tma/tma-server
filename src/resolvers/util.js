import jwt from 'jsonwebtoken'
import config from '../config'
import { Errors } from '../business/errors'
import InvalidToken from '../models/invalidToken'
import Role from '../models/role'

const verifyInvalidToken = async (token) => {
  try {
    const invalidToken = await InvalidToken.findOne({ token })
    if (invalidToken) {
      throw Errors.UNAUTHORIZED()
    }
  } catch (err) {
    console.log(err)
    throw Errors.UNAUTHORIZED()
  }
}

/**
 * check user permission and role of the token and return user info
 * @param {*} token 
 * 
 */
const checkPermission = async (token, permission) => {
  if (config.noPermission) {
    return {
      username: "abc",
      role: "ADMIN"
    }
  }

  await verifyInvalidToken(token)

  try {
    const user = jwt.verify(token, config.jwtSecret)
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

  await checkRolePermision(user, permission)
  // other kind of authorization goes here....
  return user
}

const checkRolePermision = async (user, permission) => {
  const { role } = user

  if (role === 'ADMIN') {
    return
  }
  // TODO: query data for permission
  const roleData = await Role.findAsync({ name: role })
  if (roleData) {
    const permissions = { roleData }
    if (permissions.find(p => p == permission)) {
      return
    } else {
      throw Errors.UNAUTHORIZED()
    }
  }
  throw Errors.UNAUTHORIZED()
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
    args['_id'] = { $eq: searchIdMatch }
  }
}

const setSearchUsername = (args, searchUsername) => {
  if (searchUsername && searchUsername.trim()) {
    args['username'] = { $regex: searchUsername, $options: 'i' }
  }
}


export {
  checkPermission,
  verifyInvalidToken,
  checkRolePermision,
  removeUndefined,
  getSortBy,
  setSearchTerm,
  setSearchId,
  setSearchIdMatch,
  setSearchUsername
}
