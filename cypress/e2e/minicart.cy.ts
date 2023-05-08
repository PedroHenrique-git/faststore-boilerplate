describe('Minicart', () => {
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

  it('should be possible to remove an item from cart', () => {
    cy.visit('/');

    cy.get(`[data-testid='buy-button']`).eq(0).click();
    cy.wait(1000);

    cy.get(`[data-testid='minicart']`).click();

    cy.get(`[data-testid='minicart-sidebar']`)
      .get('ul')
      .eq(0)
      .find('>li')
      .eq(0)
      .get(`[data-testid='remove-from-cart']`)
      .click();

    cy.get(`[data-testid='minicart-sidebar']`).should(($el) => {
      expect($el.attr('data-items-on-cart')).to.eq('0');
    });
  });

  it('should be possible to update an item quantity', () => {
    cy.visit('/');

    cy.get(`[data-testid='buy-button']`).eq(0).click();
    cy.wait(1000);

    cy.get(`[data-testid='minicart']`).click();

    cy.get(`[data-testid='minicart-sidebar']`)
      .get('ul')
      .eq(0)
      .find('>li')
      .eq(0)
      .get(`[data-testid='increase-item-quantity']`)
      .click();

    cy.get(`[data-testid='minicart-sidebar']`)
      .get('ul')
      .eq(0)
      .find('>li')
      .eq(0)
      .get(`[data-testid='decrease-item-quantity']`)
      .click();
  });

  it('should be possible to go to checkout', () => {
    cy.visit('/');

    cy.get(`[data-testid='buy-button']`).eq(0).click();
    cy.wait(1000);

    cy.get(`[data-testid='minicart']`).click();

    cy.get(`[data-testid='checkout-button']`).click();
  });
});

export {};
