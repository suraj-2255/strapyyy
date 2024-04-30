'use strict';

/**
 * fun-fact service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fun-fact.fun-fact');
