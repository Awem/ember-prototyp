/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-prototyp',
    environment: environment,
    baseURL: '/',
    //defaultLocationType: 'auto', //only with Cordova
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' *.openstreetmap.org connect.facebook.net",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:3000 http://127.0.0.1:3000 https://xxx.herokuapp.com *.project-osrm.org *.paypal.com",
      'img-src': "'self' *.osm.org *.tiles.mapbox.com data: *.paypal.com *.paypalobjects.com gravatar.com *.cloudfront.net",
      'style-src': "'self' 'unsafe-inline'",
      'media-src': "'self'",
      'frame-src': "'self' *.paypal.com *.facebook.com"
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      host: 'https://xxx.herokuapp.com',
      namespace: 'api',
      staticAssets: 'https://xxx.cloudfront.net/',
      binaryAssets: 'https://xxx.cloudfront.net',
      paypalUrl: 'https://www.sandbox.paypal.com/webapps/adaptivepayment/flow/pay?expType=mini&paykey='
    },
    cordova: {
      rebuildOnChange: false,
      emulate: true,
      platform: 'android'
    }
  };

  if (environment === 'development') {
    ENV.APP.host = 'http://localhost:3000';
    ENV.APP.staticAssets = '';
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    //ENV.APP.paypalUrl = 'https://www.paypal.com/webapps/adaptivepayment/flow/pay?expType=mini&paykey=';
  }

  return ENV;
};
