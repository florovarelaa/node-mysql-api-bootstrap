// don't hardcode this!! i recommend you use the following structure:

// index.js (main file)

// config.development.js (for dev environment, it must be git ignored, to avoid pushing to repo)
// config.development.js.example (for having an example file)

// file example


/**
 *
 * const config = {
   db: {
    host: process.env.HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'databaseName',
    multipleStatements: process.env.DB_MULTIPLE_STATEMENTS || true
   }
};

// the idea would be to make development file to override index default values, so you can easily adapt to different environments


 */

 /**
  * https://codeburst.io/node-js-best-practices-smarter-ways-to-manage-config-files-and-variables-893eef56cbef
  * https://codeburst.io/config-module-cleaner-way-to-write-nodejs-configuration-files-cd96ecffbde7
  */

const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'databaseName',
    multipleStatements: true
};

module.exports = config;