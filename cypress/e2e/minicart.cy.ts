import { Cart } from 'src/sdk/cart';
import { CART_STORE_KEY } from 'src/sdk/constants';
import { createStore } from 'src/sdk/store';

describe('Minicart', () => {
  const cartStore = createStore(CART_STORE_KEY, {
    id: '',
    messages: [],
    items: [],
  });

  beforeEach(() => {
    window.indexedDB.deleteDatabase('STORE_DB');
  });

  it('should be visible', () => {
    cy.visit('/');

    cy.get(`[data-testid='minicart']`).should('be.visible');
  });

  it('should show the correct number of items on cart', () => {
    cy.visit('/');

    cy.get(`[data-testid='buy-button']`).eq(0).click();
    cy.wait(1000);
    cy.get(`[data-testid='buy-button']`).eq(1).click();
    cy.wait(1000);
    cy.get(`[data-testid='buy-button']`).eq(2).click();

    cy.get(`[data-testid='minicart']`).click();

    cy.get(`[data-testid='minicart-sidebar']`)
      .get('ul')
      .eq(0)
      .find('>li')
      .should('have.length', 3);
  });

  it('should add each item on indexeddb', async () => {
    cy.visit('/');

    const { get } = await cartStore;

    cy.get(`[data-testid='buy-button']`).eq(0).click();
    cy.wait(1000);

    get<Cart>?.().then((cart) => {
      expect(cart?.items.length).to.have.length(1);
    });

    cy.get(`[data-testid='buy-button']`).eq(1).click();
    cy.wait(1000);

    get<Cart>?.().then((cart) => {
      expect(cart?.items.length).to.have.length(2);
    });

    cy.get(`[data-testid='buy-button']`).eq(2).click();

    get<Cart>?.().then((cart) => {
      expect(cart?.items.length).to.have.length(3);
    });
  });

  it('should be possible to remove an item from cart', async () => {
    cy.visit('/');

    const { get } = await cartStore;

    cy.get(`[data-testid='buy-button']`).eq(0).click();
    cy.wait(1000);

    get<Cart>?.().then((cart) => {
      expect(cart?.items.length).to.have.length(1);
    });

    cy.get(`[data-testid='minicart']`).click();

    cy.get(`[data-testid='minicart-sidebar']`)
      .get('ul')
      .eq(0)
      .find('>li')
      .eq(0)
      .contains('remove')
      .click();

    get<Cart>?.().then((cart) => {
      expect(cart?.items.length).to.have.length(0);
    });
  });

  it('should be possible to update an item quantity', () => {
    cy.visit('/');

    //const { get } = await cartStore;

    cy.get(`[data-testid='buy-button']`).eq(0).click();
    cy.wait(1000);

    cy.get(`[data-testid='minicart']`).click();

    cy.get(`[data-testid='minicart-sidebar']`)
      .get('ul')
      .eq(0)
      .find('>li')
      .eq(0)
      .contains('+')
      .click();

    //get<Cart>?.().then((cart) => {
    //expect(cart?.items[0].quantity).to.equal(2);
    //});

    cy.get(`[data-testid='minicart-sidebar']`)
      .get('ul')
      .eq(0)
      .find('>li')
      .eq(0)
      .contains('-')
      .click();

    //get<Cart>?.().then((cart) => {
    //expect(cart?.items[0].quantity).to.equal(1);
    //});
  });
});
