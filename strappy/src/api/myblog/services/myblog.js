'use strict';

/**
 * myblog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::myblog.myblog');
