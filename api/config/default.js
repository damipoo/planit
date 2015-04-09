var path = require('path');

var env  = process.env.NODE_ENV || 'development';
var root = path.join(__dirname, '..', '..');

module.exports = {
	root: root,
  port: 3006,
  env: env,
  auth: {
  	secret: '6x0C-_L7sjNfirpQ9ggBhCWuk5Qyz9XeEvG3qC2FeVfG1EDjSiWq2dkZ77VJKtn9',
  	audience: 'Bw0864Tnh8fH7VytID8p3rhS04yUJ2Xx'
  },
  database: {
    debug:      false,
    client:     'pg',
    connection: {
      host:     process.env.DATABASE_HOST || '127.0.0.1',
      user:     process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASS || 'postgres',
      database: 'planIt',
      charset:  'utf8'
    }
  },
  migration: {
    directory: path.join(root, 'migrations'),
    tableName: 'migrations',
    extension: 'js'
  },  
  express: {
    views:  'app',
    static: [ 'app' ]
  }
}