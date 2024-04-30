'use strict';

/**
 * it-service-second service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::it-service-second.it-service-second');
