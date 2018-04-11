import User from '../models/user'
import { hash, verify } from '../passwordHash'
import { Errors } from './errors'
import config from '../config'

const addUser = admin_user => async (username, password, role) => {
  const hashedPassword = await hash(password)
  const _currentUser = await User.findOneAsync({ username })
  if (_currentUser) {
    throw Errors.USER_EXIST()
  }

  const user = new User({
    username,
    password: hashedPassword,
    role,
  })

  return user.saveAsync()
}

const updateUser = admin_user => async (username, data) => {
  return User
    .updateAsync({ username }, { $set: data }, { new: true })
    .then(() => User.findOne({ _id: username }))
}

const updateUserPassword = admin_user => async (username, currentPassword, newPassword) => {
  const user = await User.findOne({ username })

  if (user) {
    try {
      await verify(currentPassword, user.password)
      const newHashedPassword = await hash(newPassword)

      // user.password = newHashedPassword
      return User
        .updateAsync({ username }, { $set: { password: newHashedPassword } }, { new: true })
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
