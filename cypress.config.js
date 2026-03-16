import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    chromeWebSecurity: false,
    testIsolation: false,
  },
  defaultCommandTimeout: 6000,
});