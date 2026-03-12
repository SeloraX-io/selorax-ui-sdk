'use strict';

/**
 * @selorax/ui — Main entry point (CommonJS)
 *
 * Re-exports the selorax global object and all component builder functions.
 */

var selorax = require('./selorax');
var components = require('./components');

exports.selorax = selorax;

// Re-export all component builders
var keys = Object.keys(components);
for (var i = 0; i < keys.length; i++) {
  exports[keys[i]] = components[keys[i]];
}
