import { verify } from './passwordHash'
import User from './models/user'
import InvalidToken from './models/invalidToken'
import config from './config'

import jwt from 'jsonwebtoken'

const loginErrorMsg = 'Username or password incorrect'

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return { status: 'Fail', message: loginErrorMsg }
    }

    const result = await verify(password, user.password)

    // console.log('got user', user)
    const token = jwt.sign(
      {
        username,
        role: user.role,
        _id: user._id,
        permissions: user.permissions
      },
      config.jwtSecret,
      { expiresIn: config.expiresIn })

    return {
      message: 'Logged in successful.',
      token,
      role: user.role,
      permissions: user.permissions,
      username
    }

  } catch (err) {
    console.log('got err', err)
    return { message: 'Logged in failed.' }
  }

}

const logout = (token) => {
  try {
    const invalidToken = new InvalidToken({ token })
    return invalidToken.saveAsync()
  } catch (err) {
    console.log('got err', err)
    return { message: 'Log out failed.' }
  }
}

export { login, logout }
