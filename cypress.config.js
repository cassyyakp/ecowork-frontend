/* eslint-disable */
/* global cy, expect, describe, it, beforeEach */

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front-ecowork.ifran-b3dev.com/",
    setupNodeEvents(on, config) {
      
    },
  },
});