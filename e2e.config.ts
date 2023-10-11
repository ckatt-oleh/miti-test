import { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from default ".env" file.
dotenv.config();

// Alternatively, read from "../my.env" file.
dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  testDir: 'tests/e2e',
  use: {
    baseURL:
      process.env.STAGING === '1'
        ? 'http://staging.mitigram.test/'
        : 'https://www.mitigram.com',
    headless: true,
    viewport: {
      width: 1280,
      height: 720,
    },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
    // {
    //   name: 'Firefox',
    //   use: {
    //     browserName: 'firefox',
    //   },
    // },
    // {
    //   name: 'Webkit',
    //   use: {
    //     browserName: 'webkit',
    //   },
    // },
  ],
};

export default config;
