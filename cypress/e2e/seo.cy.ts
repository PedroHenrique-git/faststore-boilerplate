describe('Seo', () => {
  it('verify home seo', () => {
    cy.visit('/');

    cy.get('title').should('exist');
    cy.get(`meta[name='description']`).should('exist');
    cy.get(`meta[property='og:title']`).should('exist');
    cy.get(`meta[property='og:description']`).should('exist');
    cy.get(`meta[property='og:url']`).should('exist');
    cy.get(`meta[property='og:type']`).should('exist');
    cy.get(`link[rel='canonical']`).should('exist');
    cy.get(`link[rel='canonical']`).should('exist');
    cy.get(`script[type='application/ld+json']`).should('exist');
  });

  it('verify pdp seo', () => {
    cy.visit('/apple-magic-mouse-99988216/p');

    cy.get('title').should('exist');
    cy.get(`[name='description']`).should('exist');
    cy.get(`[property='og:title']`).should('exist');
    cy.get(`[property='og:description']`).should('exist');
    cy.get(`[property='og:url']`).should('exist');
    cy.get(`[property='og:type']`).should('exist');
    cy.get(`[property='og:image']`).should('exist');
    cy.get(`[property='og:image:alt']`).should('exist');
    cy.get(`[property='product:price:amount']`).should('exist');
    cy.get(`[property='product:price:currency']`).should('exist');
    cy.get(`[rel='canonical']`).should('exist');
    cy.get(`[type='application/ld+json']`).should('exist');
  });

  it('verify search page seo', () => {
    cy.visit('/s?term=adidas');

    cy.get('title').should('exist');
    cy.get(`[name='description']`).should('exist');
    cy.get(`[property='og:title']`).should('exist');
    cy.get(`[property='og:description']`).should('exist');
    cy.get(`[property='og:type']`).should('exist');
  });

  it('verify collection page seo', () => {
    cy.visit('/adidas');

    cy.get('title').should('exist');
    cy.get(`[name='description']`).should('exist');
    cy.get(`[property='og:title']`).should('exist');
    cy.get(`[property='og:description']`).should('exist');
    cy.get(`[property='og:url']`).should('exist');
    cy.get(`[property='og:type']`).should('exist');
    cy.get(`[rel='canonical']`).should('exist');
    cy.get(`[type='application/ld+json']`).should('exist');
  });
});

export {};
