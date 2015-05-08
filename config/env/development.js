'use strict';

module.exports = {
  // db: 'mongodb://localhost/gamenight-dev',
  // db: 'mongodb://gamenightdev:gamenightdev1234@localhost:27017/gamenight-dev',
  // db: 'mongodb://gamenightdev:gamenightdev1234@localhost:27017/gamenight-dev',
  db: 'mongodb://MongoLab_GameNight:goLEfePjeihl3MIjhTv3tQj0k_1sF9D6TC0Z.VNmjfg-@ds034198.mongolab.com:34198/MongoLab_GameNight',
  mongoose: {
    debug: true
  },
  app: {
    name: 'MEAN - Game Night Manager'
  },
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};
