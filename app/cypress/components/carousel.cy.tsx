
import { HeaderCarousel } from '@/app/Components/Mainsection/headerCarousel';
import React from 'react';

describe('Carousel Component', () => {
  beforeEach(() => {
    cy.get('body');
    cy.viewport(window.screen.width, window.screen.height);
  });

  describe('With user', () => {
    beforeEach(() => {
      cy.readFile('public/images/holdup.jpg', null).then((img) => {
        cy.intercept('_next/image*', {
          statusCode: 200,
          headers: { 'Content-Type': 'image/png' },
          body: img.buffer,
        });
        cy.mount(<HeaderCarousel />);
      });
    });

    it('renders cart items', () => {
      //   cy.get('[data-cy="test-nav-items"]')
      //     .contains('Home')
      //     .get('[data-cy="test-nav-items"]')
      //     .contains('Men')
      //     .get('[data-cy="test-nav-items"]')
      //     .contains('Women')
      //     .get('[data-cy="test-nav-items"]')
      //     .contains('Kids')
      //     .get('[data-cy="test-nav-items"]')
      //     .contains('Electronics')
      //     .get('[data-cy="test-logo"]')
      //     .contains('Store');
    });
  });
});
