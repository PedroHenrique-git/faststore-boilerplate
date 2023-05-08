describe('Search', () => {
  it('should have the correct components', () => {
    cy.visit('/s?term=acer');

    cy.get(`[data-testid='header']`).should('be.visible');
    cy.get(`[data-testid='products-grid']`).should('be.visible');
    cy.get(`[data-testid='pagination']`).should('be.visible');
    cy.get(`[data-testid='sort']`).should('be.visible');
    cy.get(`[data-testid='filters']`).should('be.visible');
    cy.get(`[data-testid='footer']`).should('be.visible');
  });

  it('should be possible to change the page', () => {
    cy.visit('/s?term=acer');

    cy.get(`[data-testid='pagination']`).find('button').eq(-1).click();
  });

  it('should be possible to change the sort', () => {
    cy.visit('/s?term=acer');

    cy.get(`[data-testid='sort']`).click();
    cy.get(`[data-testid='sort'] ~ div`).children().eq(0).click();
  });

  it('should be possible to select filters', () => {
    cy.visit('/s?term=acer');

    cy.get(`[data-testid='filters']`).children().eq(0).click();

    cy.get(`[data-testid='filters']`)
      .children()
      .eq(0)
      .find('label')
      .eq(0)
      .click();
  });

  it('should be possible to open minicart', () => {
    cy.visit('/s?term=acer');

    cy.get(`[data-testid='minicart']`).click();
  });

  it('should be possible to type on the search bar input', () => {
    cy.visit('/s?term=acer');

    cy.get(`[data-testid='search-bar']`)
      .find('input')
      .eq(0)
      .type('cypress search');
  });

  it('should be possible to add an item on cart', () => {
    cy.visit('/s?term=acer');

    cy.get(`[data-testid='buy-button']`).eq(0).click();
  });

  it('should contain navbar links', () => {
    cy.visit('/s?term=acer');

    cy.contains('Office');
    cy.contains('Home Appliances');
    cy.contains('Adidas');
  });

  it('should show the searched term', () => {
    cy.visit('/s?term=acer');

    cy.contains('Showing results for:');
  });
});

export {};
