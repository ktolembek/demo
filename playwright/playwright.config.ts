import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where test files are located
  timeout: 30 * 1000, // Maximum time one test can run
  expect: {
    timeout: 5000, // Timeout for assertions
  },
  retries: 1, // Number of retries for flaky tests
  reporter: [['html', { open: 'on-failure' }]], // Generates an HTML report
  use: {
    baseURL: 'http://127.0.0.1:5000', // Base URL for API calls
    trace: 'on-first-retry', // Enables trace collection for failed tests
    screenshot: 'only-on-failure', // Captures screenshots on test failures
    video: 'retain-on-failure', // Retains videos on failures
  },
});
