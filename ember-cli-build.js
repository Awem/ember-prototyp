/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = EmberApp.env();
var isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    'ember-cli-selectize': {
      'theme': 'bootstrap3'
    },
    //emberCliFontAwesome: {
    //  useScss: true
    //},
    fingerprint: {
      enabled: isProductionLikeBuild,
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'ico'],
      prepend: 'https://xxx.cloudfront.net/',
      exclude: ['images/layers.png', 'images/layers-2x.png', 'images/marker-icon.png', 'images/marker-icon-2x.png', 'images/marker-shadow.png']
    },
    sourcemaps: {
      enabled: !isProductionLikeBuild
    },
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild },

    tests: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,
    hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,

    vendorFiles: {
      'ember.js': {
        staging:  'bower_components/ember/ember.prod.js'
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
