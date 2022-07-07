require('dotenv').config()

const config = {
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    host: process.env.HOST || 'http://localhost',
    dbHost: process.env.DB_HOST,
    dbAdmin: process.env.DB_ADMIN,
    dbPassword: process.env.DB_PASSWORD
}

module.exports = { config }