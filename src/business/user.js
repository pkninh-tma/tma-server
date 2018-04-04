import User from '../models/user'
import { hash, verify } from '../passwordHash'
import { Errors } from './errors'
import config from '../config'

const addUser = admin_user => async (username, password, role, permissions) => {
  const hashedPassword = await hash(password)
  const _currentUser = await User.findOneAsync({ _id: username })
  if (_currentUser) {
    throw Errors.USER_EXIST()
  }

  const user = new User({
    _id: username,
    password: hashedPassword,
    role,
    permissions
  })

  return user.saveAsync()
}

const updateUser = admin_user => async (username, data) => {
  // console.log(username, data)
  return User
    .updateAsync({ username }, { $set: data }, { new: true })
    .then(() => User.findOne({ _id: username }))
}

const updateUserPassword = admin_user => async (username, currentPassword, newPassword) => {
  const user = await User.findOne({ _id: username })

  if (user) {
    try {

      await verify(currentPassword, user.password)
      const newHashedPassword = await hash(newPassword)

      // user.password = newHashedPassword
      return User
        .updateAsync({ _id: username }, { $set: { password: newHashedPassword } }, { new: true })
        .then(() => User.findOne({ _id: username }))
    } catch (ex) {
      throw Errors.USERNAME_OR_PASSWORD_NOT_MATCH()
    }
  } else {
    throw Errors.USERNAME_OR_PASSWORD_NOT_MATCH()
  }
}

const deleteUser = admin_user => username => {
  return User
    .findOne({ _id: username })
    .removeAsync()
}

const getUsers = async (args, skip, limit, sortBy) => {
  const query = User.find(args).sort(sortBy).skip(skip).limit(limit)
  const total_ = User.find(args).count()
  const [result, total] = await Promise.all([query, total_])
  return { items: result, total }
}

export {
  addUser,
  deleteUser,
  updateUser,
  updateUserPassword,
  getUsers
}
