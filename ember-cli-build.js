'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const isProduction = EmberApp.env() === 'production';
const postCssPresetEnv = require('postcss-preset-env');
const tailwind = require('tailwindcss');

const purgeCSS = {
    module: require('@fullhuman/postcss-purgecss'),
    options: {
        whitelist: ['dark-theme', '[data-theme="dark"]', '[data-theme]', '[data-theme="light"]', 'light-theme'],
        content: ['./app/index.html', './app/templates/**/*.hbs', './app/components/**/*.hbs'],
        defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    },
};

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
      storeConfigInMeta: false,

      outputPaths: {
          app: {
              html: 'index.html',
              css: {
                  app: '/assets/@boilerplate-dashboard.css',
              },
              js: '/assets/@boilerplate-dashboard.js',
          },
      },

      'ember-fetch': {
          preferNative: true,
      },

      'ember-bootstrap': {
          importBootstrapCSS: false,
          importBootstrapFont: false,
          whitelist: ['bs-button', 'bs-modal'],
          bootstrapVersion: 4,
      },

      postcssOptions: {
          compile: {
              plugins: [
                  {
                      module: require('postcss-import'),
                      options: {
                          path: ['node_modules'],
                      },
                  },
                  tailwind('./app/tailwind/tailwind.config.js'),
                  postCssPresetEnv({ stage: 1 }),
                  require('postcss-nested'),
                  // require('autoprefixer'),
                  ...(isProduction ? [purgeCSS] : []),
              ],
          },
      },
  });

  return app.toTree();
};
