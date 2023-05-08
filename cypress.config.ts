import { defineConfig } from 'cypress';

export default defineConfig({
  retries: 0,
  video: true,
  trashAssetsBeforeRuns: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1000,
  viewportHeight: 600,

  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
  },
});
