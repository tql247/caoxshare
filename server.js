require('dotenv').config()
require('module-alias/register')
require('events').defaultMaxListeners = 100;
require('./src/utils/socket')
require('./src/index')
