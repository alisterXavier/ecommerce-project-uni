import { Navbar } from '@/app/Navbar/Navbar';
import { UserMetadata } from '@supabase/supabase-js';
import React, { useState } from 'react';

describe('Navbar Component', () => {
  const path = '/';

  beforeEach(() => {
    cy.get('body');
    cy.viewport(window.screen.width, window.screen.height);
  });
  describe('Without user', () => {
    beforeEach(() => {
      cy.mount(<Navbar path={path} user={null} />);
    });

    it('renders Navbar', () => {
      cy.get('[data-cy="test-nav-items"]')
        .contains('Home')
        .get('[data-cy="test-nav-items"]')
        .contains('Men')
        .get('[data-cy="test-nav-items"]')
        .contains('Women')
        .get('[data-cy="test-nav-items"]')
        .contains('Kids')
        .get('[data-cy="test-nav-items"]')
        .contains('Electronics')
        .get('[data-cy="test-logo"]')
        .contains('Store');
    });

    it('Search input should slide down', () => {
      cy.get('[data-cy="test-search"]').click();
      cy.get('[data-cy="test-search-input"]')
        .type('Typewriter 101')
        .should('have.attr', 'style')
        .and('include', 'transform: translateY(0%) translateZ(0px)');
    });

    it('Login should apper', () => {
      cy.get('[data-cy="test-nav-items"]')
        .contains('Login')
        .should('have.attr', 'href', '/Login');
    });
  });

  describe('With user', () => {
    const user: UserMetadata | null = {};
    beforeEach(() => {
      cy.mount(<Navbar path={path} user={user} />);
    });
    it('renders Navbar', () => {
      cy.get('[data-cy="test-nav-items"]')
        .contains('Home')
        .get('[data-cy="test-nav-items"]')
        .contains('Men')
        .get('[data-cy="test-nav-items"]')
        .contains('Women')
        .get('[data-cy="test-nav-items"]')
        .contains('Kids')
        .get('[data-cy="test-nav-items"]')
        .contains('Electronics')
        .get('[data-cy="test-logo"]')
        .contains('Store');
    });

    it('Search input should slide down', () => {
      cy.get('[data-cy="test-search"]').click();
      cy.get('[data-cy="test-search-input"]')
        .type('Typewriter 101')
        .should(
          'have.attr',
          'style',
          'transform: translateY(0%) translateZ(0px);'
        );
    });

    it('User options should apper', () => {
      const userOptions = cy.get('[data-cy="test-user-options"]');
      userOptions.should('not.be.visible');

      cy.get('[data-cy="test-user"]')
        .click()
        .then(($userBtn) => {
          userOptions.should('be.visible');

          cy.wrap($userBtn)
            .get('[data-cy="test-user-options-item"]')
            .contains('Sign Out')
            .click();
        });
    });
  });
});
