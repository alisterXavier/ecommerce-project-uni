import { Navbar } from '@/app/Navbar/Navbar';
import { Cart } from '@/app/cart/page';
import { MainSection } from '@/app/page';
import { calculateDiscountedPrice } from '@/shared/helpers/utils';
import { components } from '@/shared/types/api';
import { UserMetadata } from '@supabase/supabase-js';
import React, { useState } from 'react';

describe('Carousel Component', () => {
  const path = '/';

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
        cy.mount(<MainSection />);
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
