/* eslint-disable */
/* global cy, expect, describe, it, beforeEach */

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      
    },
  },
});