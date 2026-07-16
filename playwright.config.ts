import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: 'http://localhost:4200',
  },
  webServer: {
    command: 'ng serve',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
  },
});