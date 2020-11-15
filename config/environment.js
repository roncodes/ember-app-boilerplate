'use strict';

const modulePrefix = '@boilerplate/dashboard';

module.exports = function (environment) {
    let ENV = {
        modulePrefix,
        environment,
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false,
            },
        },

        greeting: process.env.greeting,

        googleFonts: ['Inter:wght@100;200;300;400;500;600'],

        fontawesome: {
            defaultPrefix: 'fad', // duotone
        },

        'ember-simple-auth': {
            routeAfterAuthentication: 'console',
        },

        'ember-local-storage': {
            namespace: modulePrefix,
            keyDelimiter: '/',
            includeEmberDataSupport: true,
        },

        'ember-light-table': {
            enableSync: true,
        },

        'ember-cli-notifications': {
            includeFontAwesome: true,
            autoClear: true,
            clearDuration: 2400,
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },

        API: {
            host: process.env.api_host,
            namespace: process.env.api_namespace,
        },
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
