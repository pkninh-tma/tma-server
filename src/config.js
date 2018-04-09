var env = process.env.NODE_ENV || 'development';

const config_ = {
  development: {
    jwtSecret: '5dd3d117-092d-4bc8-bc7a-0014d007b8c0',
    expiresIn: 3600 * 24 * 7, // 1 week
    MONGO_URL: 'mongodb://tma:123@ds233739.mlab.com:33739/tma-db',
    PORT: 4000,
    noPermission: false,
    defaultPassword: '123'
  }
}

export default config_[env]
