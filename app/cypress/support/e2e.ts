// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { store } from '@/shared/redux/store';
import { MantineProvider, createTheme } from '@mantine/core';
import { Provider } from 'react-redux';
import './commands';
import { MountOptions, MountReturn, mount } from 'cypress/react18';
import { MemoryRouterProps } from 'react-router-dom';
// import '../tailwind/output.css';
// import '@mantine/core/styles.css';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}
const theme = createTheme({});

Cypress.Commands.add('mount', (component, options = {}) => {
  return mount(component, options);
});