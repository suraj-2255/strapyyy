'use strict';

/**
 * fun-fact controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fun-fact.fun-fact');
