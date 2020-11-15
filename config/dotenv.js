/* eslint-env node */

'use strict';

module.exports = function(env) {
  return {
      clientAllowedKeys: ['greeting'],
      fastbootAllowedKeys: [],
      failOnMissingKey: false,
      path: `./environments/.env.${env}`,
  };
};