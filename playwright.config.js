// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =  ({
  testDir: './tests', //select wich tests to run

  timeout: 30 * 1000, //maximum time one test can run for
  expect: {
    timeout: 5000 //maximum time expect() should wait for the condition to be met
  },

  reporter: [
    
    ['html', {
      open: 'never', //open the report only if there are test failures
      outputFolder: 'html-report'
    }]
  ],
  
  use: {

    browserName: 'chromium',
    headless: false
  },
});
module.exports = config;
