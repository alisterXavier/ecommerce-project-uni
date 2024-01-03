import { calculateDiscountedPrice } from '@/shared/helpers/utils';
import { components } from '@/shared/types/api';

const CateArray = ['Home', 'Women', 'Kids', 'Electronics', 'Men'];
const mockData = [
  {
    created_at: '2023-11-12T11:43:31+00:00',
    productName:
      "Men's Heavyweight Fleece Cargo Sweatpants Elastic Waist Joggers Baggy Drawstring Sweatpants with Pockets Cargo Pants Trousers",
    description:
      "Material : Men's fleece cargo sweatpants are made of high quality cotton blend. Super soft stretchy fabric for movement and skin- friendly, relaxed, loose fit, perfect for sport wear and relaxed everyday wear.\nDesign : Cargo sweatpants for men with open bottom and relaxed fit straight leg design are perfect year-round, also the style that occupy the home. Baggy joggers sweatpants has multi pockets, and the cargos sweat pants hem with adjustable cords. Elastic waistband with drawstring for a customized fit, offers the cargo joggers great mobility. If you need a nice athletic pants, you can't go wrong with our cargo pants.\nMulti-Pockets : Our mens cargo sweatpants are thoughtfully made with 2 side pockets, 1 rear pocket and 2 cargo pockets, so you can keep your phone, keys, card or other valuables during your workouts or exercises.\nOccasion : Cargo pants for men perfect for outdoor activities or daily casual wear, jogging, hiking, basketball training, football training, tennis, morning and night running, cycling, climbing, workout and etc. Draw-cord adjustable on elastic waist also can be used in casual.\nTips : Our mens joggers sweatpants are smaller than normal size, please Refer to the Our Size Chart before Ordering . Any other questions, please contact us freely.",
    price: 150,
    category: 'men',
    discount: 0,
    productImages: [
      'https://m.media-amazon.com/images/I/61cajJzmHlS._AC_SX522_.jpg',
    ],
    id: '175400ff-1846-4786-8c50-e2f7d0cd6ef7',
  },
  {
    created_at: '2023-11-12T13:09:53+00:00',
    productName: 'Burberry',
    description: 'Japanese mid-rise slim-fit jeans',
    price: 170,
    category: 'men',
    discount: 10,
    productImages: [
      'https://cdn-images.farfetch-contents.com/20/23/50/72/20235072_50165036_1000.jpg',
      'https://cdn-images.farfetch-contents.com/20/23/50/72/20235072_50165025_1000.jpg',
      'https://cdn-images.farfetch-contents.com/20/23/50/72/20235072_50165028_1000.jpg',
      'https://cdn-images.farfetch-contents.com/20/23/50/72/20235072_50165019_1000.jpg',
    ],
    id: '931fc72b-4cf6-4fe3-a986-657a25427260',
  },
  {
    created_at: '2023-11-11T11:34:16.359215+00:00',
    productName:
      "Wrangler Authentics Men's Long Sleeve Quilted Lined Flannel Shirt Jacket with Hood",
    description:
      'RELAXED FIT: Constructed with comfort in mind, this long sleeve quilted lined flannel shirt is a wardrobe essential for those cold Winter nights.\nHEAVYWEIGHT MATERIALS: Built with button cuffs and quilted polyester padding for more durability and added warmth.\nFOR ADDED WARMTH: Padded with diamond black quilted polyester to create extra warmth while also creating breathability, this is an extremely versatile flannel shirt.\nFUNCTIONAL STYLE: Lined with 100% cotton, this brushed flannel is made with style in mind. Wear it on the job or out to lunch, this essential closet staple can be worn for many occasions.\nADDED STORAGE: Constructed with (2) dual front chest pockets and (2) side seam pockets, this flannel has easy-access storage for all your basic necessities.',
    price: 74.99,
    category: 'men',
    discount: 0,
    productImages: [
      'https://m.media-amazon.com/images/I/61J2YWfGrXL._AC_SX425_.jpg',
    ],
    id: 'bd800e40-c337-452e-bcb9-dc62f0cfcb26',
  },
  {
    created_at: '2023-11-11T12:11:10.649575+00:00',
    productName: 'Calvin Klein - Euphoria',
    description: 'Calvin Klein - Euphoria For Men Eau de Toilette 3.4 oz.',
    price: 100,
    category: 'men',
    discount: 0,
    productImages: [
      'https://i.ebayimg.com/images/g/uIIAAOSwrNpiew6W/s-l1600.jpg',
    ],
    id: '5c27d69a-cf73-4414-a86b-f36a1752e8fc',
  },
  {
    created_at: '2023-11-12T11:40:29+00:00',
    productName:
      "Legendary Whitetails Men's Camp Night Berber Lined Hooded Flannel Shirt Jacket",
    description:
      'Lined with thick super soft Berber and insulated with poly-fill\nFull cotton brushed flannel shell and berber lined hood\nLegendary Signature Buck snaps\nSmooth lined quilted sleeves for comfort\nSide hand warmer pockets. Tumble dry low',
    price: 200,
    category: 'men',
    discount: 0,
    productImages: [
      'https://m.media-amazon.com/images/I/911gXbHH1NL._AC_SX466_.jpg',
    ],
    id: '8bfae347-1709-418e-8fe7-0c7ecf33c3a4',
  },
  {
    created_at: '2023-11-12T14:58:23.547047+00:00',
    productName: 'PLUS OVERSIZED ROSE BACK GRAPHIC T-SHIRT',
    description:
      "Your tee collection just got an upgrade with this plus size tshirt for men from our latest collection. Cut with additional room for the perfect fit, this style has serious add-to-bag potential. With short sleeves and a classic neckline, this is a wardrobe staple we can't get enough of. Wear with jeans and trainers for a casual fit or layer under an open shirt for weekend plans.\nStyle: Printed T-Shirt\nDesign: Graphic\nFabric: Cotton\nLength: Regular\nNeckline: Crew\nSleeve Length: Short Sleeve\n100% Cotton. Model is 6'1\" and wears a size 3XL",
    price: 33,
    category: 'men',
    discount: 0,
    productImages: [
      'https://media.boohoo.com/i/boohoo/bmm50924_sage_xl/male-sage-plus-oversized-rose-back-graphic-t-shirt?w=450&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit',
    ],
    id: 'bd9f2da1-75f0-427e-ba40-0d2c8d01f2f4',
  },
  {
    created_at: '2023-11-12T11:35:44+00:00',
    productName: "Legendary Whitetails Men's Maplewood Hooded Shirt Jacket",
    description:
      'Quilted satin lined body and sleeves\n130 gm of poly-fill insulation\nZippered entry placket and double lined fleece hood\nConvenient side hand warming pockets\nLegendary buttons and Signature Buck logo embroidery',
    price: 80,
    category: 'men',
    discount: 0,
    productImages: [
      'https://m.media-amazon.com/images/I/91TSFekUKwL._AC_SX466_.jpg',
    ],
    id: '28bdc190-59e7-4ab8-8d5b-8053faf52b57',
  },
  {
    created_at: '2023-11-12T11:30:21+00:00',
    productName: "Nike Men's Tennis Shoe",
    description:
      'he crisp leather on the upper ensures durability and is easy to wear\nThe modern herringbone sole gives the traditional style\nThe padded, low-cut collar looks elegant and feels good',
    price: 100,
    category: 'men',
    discount: 0,
    productImages: [
      'https://m.media-amazon.com/images/I/61nAjPyqKNL._AC_SX500_.jpg',
    ],
    id: '9c1c2ba2-1fac-4f26-a4ee-71506a4b737b',
  },
  {
    created_at: '2023-11-11T11:28:32.514248+00:00',
    productName: 'Satoru Gojo Hoodie',
    description:
      'Regular fit\nMaterial: Cotton / Polyester / Elastane\nPullover hood\nLarge front kangaroo pocket\nRibbed hem and cuffs',
    price: 33.08,
    category: 'men',
    discount: 0,
    productImages: [
      'https://kujowares.com/cdn/shop/products/Hc9a1ee1cd2184416afed775595917c65r.jpg?v=1667688655&width=1946',
    ],
    id: 'edb6ca50-fbfc-4c58-b858-a5150729604b',
  },
  {
    created_at: '2023-11-13T11:26:39+00:00',
    productName: "Nike Men's Gymnastics Shoes Sneakers",
    description:
      'An embossed design\nInsole Technologies: Cushioned insole\nThe shank measures approximately halfway down the top arch\nThe rubber outsole provides strength and grip\nThe synthetic leather upper is durable',
    price: 54,
    category: 'men',
    discount: 0,
    productImages: [
      'https://m.media-amazon.com/images/I/71Ei1FQmcmL._AC_SX500_.jpg',
    ],
    id: 'd26672ef-75c0-41be-a29b-8b86d3d9997b',
  },
  {
    created_at: '2023-11-12T11:45:19+00:00',
    productName: "Dickies Men's Relaxed Straight-fit Carpenter Jean",
    description:
      'Straight-fit carpenter jean with hammer loop and utility pockets featuring triple-stitched reinforced seams\nZip fly with button',
    price: 69.99,
    category: 'men',
    discount: 0,
    productImages: [
      'https://m.media-amazon.com/images/I/81jkluoRvoL._AC_SY500_.jpg',
    ],
    id: '0ca887fa-aa96-4199-85bb-9798776a27e8',
  },
  {
    created_at: '2023-11-12T11:41:58+00:00',
    productName: 'Dickies Men’s Relaxed Fit Sanded Duck Carpenter Jean',
    description:
      'Utility loop and dual tool pockets\nRivets at all stress points\nHeavy duty brass zipper\nFits over boots\nRelaxed fit means extra room through seat and thigh, slightly tapered leg with 18 inch opening.',
    price: 79.99,
    category: 'men',
    discount: 0,
    productImages: [
      'https://m.media-amazon.com/images/I/810k-Ly2FaL._AC_SY500_.jpg',
    ],
    id: '96a13ea5-597b-4973-b10a-ad7329a1bf45',
  },
];
const mockCart: components['schemas']['Carts'] | undefined = {
  id: 'testId',
  customerId: 'testCustomer',
  products: [mockData[0], mockData[1]],
  total: 0,
};
mockCart.total = mockCart.products.reduce((i, acc) => {
  return i + acc.price;
}, 0);

describe('App flow', () => {
  before(() => {
    cy.viewport(window.screen.width, window.screen.height);
    cy.intercept('GET', 'http://localhost:5001/products/men?price=', {
      data: mockData,
    });
    CateArray.forEach((item) => {
      cy.intercept(
        'GET',
        `http://localhost:5001/products/${item.toLowerCase()}?price=`,
        {
          data: mockData,
        }
      );
    });
    cy.intercept('POST', 'http://localhost:5001/register', {
      message: 'Registration successful',
      user: {},
    });
    cy.intercept('PATCH', 'http://localhost:5001/cart', {
      data: mockCart,
    });
    cy.intercept(
      'GET',
      'http://localhost:5001/cart/27b15b92-2daa-45e6-a4ae-d4ef370f48d7',
      {
        data: mockCart,
      }
    );
    mockData.forEach((item) => {
      cy.intercept('GET', `http://localhost:5001/product/${item.id}`, {
        data: mockData.filter((i) => i.id === item.id)[0],
      });
    });
  });

  // it('Sign up', () => {
  //   cy.visit('http://localhost:3000/Login');
  //   cy.get('[data-cy="test-signUp-container"');
  //   cy.get('[data-cy="test-signUp-btn"]').click();
  //   cy.get('[data-cy="test-signUp-container"]').within(() => {
  //     cy.get('[data-cy="test-email-input"]').type('tiyexay847@ubinert.com');
  //     cy.get('[data-cy="test-password-input"]').type('123456789');

  //     cy.get('[data-cy="test-confirm-btn"]').click();
  //     cy.wait(1000);
  //   });
  // });

  describe('Sign in and perfrom user activities', () => {
    beforeEach(() => {
      cy.viewport(window.screen.width, window.screen.height);
      cy.visit('http://localhost:3000/Login');
      cy.get('[data-cy="test-signIn-container"]').within(() => {
        cy.get('[data-cy="test-email-input"]').type('tiyexay847@ubinert.com');
        cy.get('[data-cy="test-password-input"]').type('123456789');
        cy.get('[data-cy="test-confirm-btn"]').click();
      });
      cy.wait(1000);
    });

    it('Nav check, product page, Adding items, qty check, ', () => {
      // Navbar -- Tests
      CateArray.forEach((item) => {
        cy.get('[data-cy="test-nav-items"]')
          .contains(item)
          .click()
          .then(() => {
            cy.location().should((loc) => {
              expect(loc.pathname).to.eq(
                item === 'Home' ? '/' : `/Category/${item}`
              );
            });
          });
      });
      cy.get('[data-cy="test-logo"]').contains('Store');

      cy.get('[data-cy="test-category-title"] h2:first').should(
        'have.text',
        'HOME'
      );
      cy.get('[data-cy="test-category-title"] h2:last').should(
        'have.text',
        'Men'
      );

      // Product Card -- Tests
      cy.get('[data-cy="test-small-product-card"] div:last').click();

      // Product Page -- Tests
      const selectedProduct = mockData[mockData.length - 1];
      cy.get('[data-cy="test-product-image"]');
      cy.get('[data-cy="test-product-name"]').should(
        'have.text',
        selectedProduct.productName
      );
      cy.get('[data-cy="test-product-description"]').should(
        'have.text',
        selectedProduct.description
      );
      cy.get('[data-cy="test-product-price"]').contains(selectedProduct.price);
      cy.get('[data-cy="test-add-product"]').click();

      cy.get('[data-cy="test-cart"]').click();

      mockCart.products.map((item) => {
        const qty = cy.get(`[data-cy="test-cart-item-qty-${item.id}"]`);
        cy.get(`[data-cy="test-cart-item-image-${item.id}"]`).should(
          'have.attr',
          'src'
        );

        // Cart -- Tests
        cy.get(`[data-cy="test-cart-item-title-${item.id}"]`)
          .should('have.text', item.productName)
          // .get(`[data-cy="test-cart-item-discount-${item.id}"]`)
          // .should('have.text', `-${item.discount}%`)
          // .get(`[data-cy="test-cart-item-price-${item.id}"]`)
          // .should(
          //   'have.text',
          //   `$${parseFloat(
          //     calculateDiscountedPrice(item.price, item.discount)
          //   )}`
          // )
          .get(`[data-cy="test-cart-item-decrement-${item.id}"]`)
          .click()
          .then(() => qty.should('have.text', '0'))
          .get(`[data-cy="test-cart-item-increment-${item.id}"]`)
          .dblclick()
          .then(() => qty.should('have.text', '2'))
          .get(`[data-cy="test-cart-item-remove-${item.id}"]`)
          .click();
      });
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
      cy.get("[data-cy='test-login-btn']").click();
    });
  });
});
