'use strict';

/**
 * web-banner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::web-banner.web-banner');
