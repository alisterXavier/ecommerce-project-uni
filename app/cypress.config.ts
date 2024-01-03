import { defineConfig } from 'cypress';
import { NormalModuleReplacementPlugin } from 'webpack';
import path from 'path';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    supportFile: './cypress/support/component.{js,jsx,ts,tsx}',

  },
  e2e: {
    supportFile: './cypress/support/e2e.{js,jsx,ts,tsx}',
  },
});
