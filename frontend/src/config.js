/** @format */

const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    apiPath: 'http://localhost:5000',
    domain: 'aaavape.com',
    revivePath: 'https://aaavape.com',
    lockScreen: true,
  },
  production: {
    apiPath: 'http://localhost:5000',
    domain: 'aaavape.com',
    revivePath: 'https://aaavape.com',
    lockScreen: true,
  },
  domain: '.aaavape.com',
}
module.exports = config[env]
