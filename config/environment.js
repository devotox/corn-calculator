'use strict';

module.exports = function(environment) {

  const head = require('./head');

  const EmberENV = {
    FEATURES: {
      // Here you can enable experimental features on an ember canary build
      // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
    },
    EXTEND_PROTOTYPES: {
      // Prevent Ember Data from overriding Date.parse.
      Date: false
    }
  };

  const APP = {
    // Here you can pass flags/options to your application instance
    // when it is created
  };

  let ENV = {
	APP,
	head,
    EmberENV,
    environment,
    rootURL: '/',
    locationType: 'auto',
    modulePrefix: 'corn-calculator',
    historySupportMiddleware: true,
    sentry: {
      dsn: 'https://68306652fe2441d2aa7388043f48d43b@o438862.ingest.sentry.io/5404584'
    },
    airtable: {
      apiKey: 'keyFFkFS9rn0L5XYX',
      baseKey: 'appUs3mxuwDYBe0TC'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
