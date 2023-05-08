const hasEvent = (datalayer: DataLayerEvent[], eventName: string) => {
  return datalayer.some((e) => e.event === eventName);
};

describe('Analytics', () => {
  it('should dispatch add_to_cart when some item was add on cart', () => {
    cy.visit('/');

    cy.get(`[data-testid='buy-button']`).eq(0).click();

    cy.window().then((window) => {
      const { dataLayer } = window;

      expect(hasEvent(dataLayer, 'add_to_cart')).to.eq(true);
    });
  });

  it('should dispatch remove_from_cart when some item was removed from cart', () => {
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

    cy.window().then((window) => {
      const { dataLayer } = window;

      expect(hasEvent(dataLayer, 'remove_from_cart')).to.eq(true);
    });
  });

  it('should dispatch select_item and search_select_item when some product was clicked', () => {
    cy.visit('/');

    cy.get(`[data-testid='product-card']`).eq(0).find('h3').click();

    cy.window().then((window) => {
      const { dataLayer } = window;

      expect(hasEvent(dataLayer, 'select_item')).to.eq(true);
      expect(hasEvent(dataLayer, 'search_select_item')).to.eq(true);
    });
  });

  it('should dispatch view_item_list when some product list is visible', () => {
    cy.visit('/');

    cy.scrollTo('bottom', { duration: 1000 }).then(() => {
      cy.window().then((window) => {
        const { dataLayer } = window;

        expect(hasEvent(dataLayer, 'view_item_list')).to.eq(true);
      });
    });
  });

  it('should dispatch intelligent_search_query when some plp was accessed', () => {
    cy.visit('/s?term=acer');

    cy.wait(3000);

    cy.window().then((window) => {
      const { dataLayer } = window;

      expect(hasEvent(dataLayer, 'intelligent_search_query')).to.eq(true);
    });
  });

  it('should dispatch search when type on SearBar', () => {
    cy.visit('/');

    cy.get(`[data-testid='search-bar']`).find('input').eq(0).type('something');

    cy.wait(1500);

    cy.window().then((window) => {
      const { dataLayer } = window;

      expect(hasEvent(dataLayer, 'search')).to.eq(true);
    });
  });

  it('should dispatch view_cart when minicart is open', () => {
    cy.visit('/');

    cy.get(`[data-testid='minicart']`).click();

    cy.window().then((window) => {
      const { dataLayer } = window;

      expect(hasEvent(dataLayer, 'view_cart')).to.eq(true);
    });
  });
});

export {};
