import { Navbar } from '@/app/Navbar/Navbar';
import { Cart } from '@/app/cart/page';
import { calculateDiscountedPrice } from '@/shared/helpers/utils';
import { components } from '@/shared/types/api';
import { UserMetadata } from '@supabase/supabase-js';
import React from 'react';

describe('Carts Component', () => {
  const path = '/';
  const user: UserMetadata | null = { data: { user: {} } };
  const updateCart = {
    removeCartItem: (product: components['schemas']['Products']) => {},
    addCartItem: (product: components['schemas']['Products']) => {},
  };

  beforeEach(() => {
    cy.get('body');
    cy.viewport(window.screen.width, window.screen.height);
  });

  describe('With no items', () => {
    const mockCart: components['schemas']['Carts'] | undefined = {
      id: 'testId',
      customerId: 'testCustomer',
      products: [],
      total: 0,
    };

    beforeEach(() => {
      cy.mount(
        <Cart
          user={user}
          cart={mockCart}
          isLoading={false}
          updateCart={updateCart}
        />
      );
    });

    it('without data', () => {
      cy.get('[data-cy="test-add-cart-items"]').should(
        'have.text',
        'Add items to your cart.'
      );
    });

    it('renders Checkout box', () => {
      cy.get('[data-cy=test-checkout]')
        .get('[data-cy=test-selected-items]')
        .should('have.text', `(${mockCart.products.length})`)
        .get('[data-cy=test-total]')
        .should('have.text', `$${mockCart.total}`);
    });
  });

  describe('with data', () => {
    const mockCart: components['schemas']['Carts'] | undefined = {
      id: 'testId',
      customerId: 'testCustomer',
      products: [
        {
          id: 'productTestId',
          created_at: 'Today',
          productName: 'Typewriter',
          description: 'Typewriter',
          productImages: ['/public/images/holdup.jpg'],
          category: 'Electronics',
          price: 101,
          discount: 5,
        },
        {
          id: 'productTestId404',
          created_at: 'Today',
          productName: 'Typewriter404',
          description: 'Typewriter404',
          productImages: ['/public/images/holdup.jpg'],
          category: 'Electronics',
          price: 404,
          discount: 99,
        },
      ],
      total: 101,
    };
    beforeEach(() => {
      cy.readFile('public/images/holdup.jpg', null).then((img) => {
        cy.intercept('_next/image*', {
          statusCode: 200,
          headers: { 'Content-Type': 'image/png' },
          body: img.buffer,
        });
        cy.mount(
          <Cart
            user={user}
            cart={mockCart}
            isLoading={false}
            updateCart={updateCart}
          />
        );
      });
    });

    it('displays all items', () => {
      mockCart.products.map((item) => {
        const qty = cy.get(`[data-cy="test-cart-item-qty-${item.id}"]`);
        cy.get(`[data-cy="test-cart-item-image-${item.id}"]`).should(
          'have.attr',
          'src'
        );

        cy.get(`[data-cy="test-cart-item-title-${item.id}"]`)
          .should('have.text', item.productName)
          .get(`[data-cy="test-cart-item-discount-${item.id}"]`)
          .should('have.text', `-${item.discount}%`)
          .get(`[data-cy="test-cart-item-price-${item.id}"]`)
          .should(
            'have.text',
            `$${parseFloat(
              calculateDiscountedPrice(item.price, item.discount)
            )}`
          )
          .get(`[data-cy="test-cart-item-decrement-${item.id}"]`)
          .click()
          .then(() => qty.should('have.text', '0'))
          .get(`[data-cy="test-cart-item-increment-${item.id}"]`)
          .dblclick()
          .then(() => qty.should('have.text', '2'))
          .get(`[data-cy="test-cart-item-remove-${item.id}"]`)
          .click();
      });
    });
    it('renders Checkout box', () => {
      cy.get('[data-cy=test-checkout]')
        .get('[data-cy=test-selected-items]')
        .should('have.text', `(${mockCart.products.length})`)
        .get('[data-cy=test-total]')
        .should('have.text', `$${mockCart.total}`);
    });
  });
});
