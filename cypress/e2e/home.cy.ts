describe('Home', () => {
  it('should have the correct components', () => {
    cy.visit('/');

    cy.get(`[data-testid='header']`).should('be.visible');
    cy.get(`[data-testid='carousel']`).should('be.visible');
    cy.get(`[data-testid='hero-card']`).should('be.visible');
    cy.get(`[data-testid='banner-text']`).should('be.visible');
    cy.get(`[data-testid='product-shelf']`).should('be.visible');
    cy.get(`[data-testid='footer']`).should('be.visible');
    cy.get(`[data-testid='newsletter']`).should('be.visible');
  });

  it('should be possible to click on the hero card link', () => {
    cy.visit('/');

    cy.get(`[data-testid='hero-card']`).find('a').click();
  });

  it('should be possible to click on the banner text link', () => {
    cy.visit('/');

    cy.get(`[data-testid='banner-text']`).find('a').click();
  });

  it('should be possible to change the carousel slider', () => {
    cy.visit('/');

    cy.get(`[data-testid='carousel']`).find('.splide__arrow--next').click();
    cy.get(`[data-testid='carousel']`).find('.splide__arrow--prev').click();
  });

  it('should be possible to change the shelf page', () => {
    cy.visit('/');

    cy.get(`[data-testid='product-shelf']`)
      .eq(0)
      .find('.splide__arrow--next')
      .click({ force: true });

    cy.get(`[data-testid='product-shelf']`)
      .eq(0)
      .find('.splide__arrow--prev')
      .click({ force: true });
  });

  it('should be possible to insert data on the newsletter form', () => {
    cy.visit('/');

    cy.get(`[data-testid='newsletter']`)
      .find('input')
      .eq(0)
      .type('User test cypress');

    cy.get(`[data-testid='newsletter']`)
      .find('input')
      .eq(1)
      .type('test@email.com');
  });

  it('should be possible to submit data on the newsletter form', () => {
    cy.visit('/');

    cy.get(`[data-testid='newsletter']`)
      .find('input')
      .eq(0)
      .type('User test cypress');

    cy.get(`[data-testid='newsletter']`)
      .find('input')
      .eq(1)
      .type('test@email.com');

    cy.get(`[data-testid='newsletter']`).find(`button[type='submit']`).click();
  });

  it('should be possible to open minicart', () => {
    cy.visit('/');

    cy.get(`[data-testid='minicart']`).click();
  });

  it('should be possible to type on the search bar input', () => {
    cy.visit('/');

    cy.get(`[data-testid='search-bar']`)
      .find('input')
      .eq(0)
      .type('cypress search');
  });

  it('should be possible to add an item on cart', () => {
    cy.visit('/');

    cy.get(`[data-testid='buy-button']`).eq(0).click();
  });

  it('should contain navbar links', () => {
    cy.visit('/');

    cy.contains('Office');
    cy.contains('Home Appliances');
    cy.contains('Adidas');
  });
});

export {};
