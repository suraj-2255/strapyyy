'use strict';

/**
 * siteinformation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::siteinformation.siteinformation');
