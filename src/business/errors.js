class CustomError extends Error {
  constructor(code = '', ...params) {
    super(...params)

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, CustomError)
    // Custom debugging information
    this.code = code
  }
}

const Errors = {
  INVALID_RATE: () => new CustomError('INVALID_RATE', 'Invalid rate'),
  ID_EXISTS: () => new CustomError('ID_EXISTS', "The id already exists in database"),
  UNAUTHORIZED: () => new CustomError('UNAUTHORIZED', "unauthorized"),
  USERNAME_OR_PASSWORD_NOT_MATCH: () => new CustomError('USERNAME_OR_PASSWORD_NOT_MATCH', "Username or Password does not match"),
  USER_EXIST: () => new CustomError('USER_EXIST', "User already exists"),
}

export { Errors }
