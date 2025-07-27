import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,  // Run tests sequentially
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'html',
  testMatch: ['**/simple-ui.spec.ts'],  // Only run the 4 essential UI tests
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: [
    {
      command: 'npm start',
      cwd: '../backend',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm start',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
