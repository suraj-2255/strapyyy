'use strict';

/**
 * fun-fact router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::fun-fact.fun-fact');
