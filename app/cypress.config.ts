import { defineConfig } from 'cypress';

export default defineConfig({
  // component: {
  //   devServer: {
  //     framework: 'next',
  //     bundler: 'webpack',
  //   },
  //   supportFile: './cypress/support/component.{js,jsx,ts,tsx}',

  // },
  e2e: {
    setupNodeEvents(on, config) {},
    // supportFile: './cypress/support/e2e.{js,jsx,ts,tsx}',
  },
});
