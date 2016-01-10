var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'development',
  'staging',
  'production'
];

module.exports = function(deployTarget) {
  var ENV = {
  };
  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    ENV.redis = {
      host: 'localhost',
      port: 6379
    };
    ENV.s3 = {
      gzip: false, // if undefined or set to true, files are gziped
      gzipExtensions: ['js', 'css', 'svg'], // if undefined, js, css & svg files are gziped
      exclude: ['.DS_Store', '*-test.js'], // defaults to empty array
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY,
      bucket: 'static-assets',
      region: 'eu-central-1'
    };
    ENV.plugins = ['build', 'redis']; // only care about deploying index.html into redis in dev
  }

  if (deployTarget === 'staging' || deployTarget === 'production') {
    ENV.redis = {
      host: 'pub-redis',
      port: 12436,
      password: process.env.REDIS_SECRET
    };
    ENV.s3 = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY,
      bucket: 'static-assets',
      region: 'eu-central-1'
    };
    //ENV.plugins = ['build', 'revision-data', 'manifest', 'gzip', 'redis', 's3'];
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'staging';
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
  }

  return ENV;

  /* Note: a synchronous return is show above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + deployTarget;
   *      exec(command, function (error, stdout, stderr) {
   *        ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/redistogo:/, '//:');
   *        if (error) {
   *          reject(error);
   *        } else {
   *          resolve(ENV);
   *        }
   *      });
   *    });
   *
   */
};
