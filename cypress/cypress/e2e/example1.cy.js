describe('Heading Text', () => {
    it('contains the title of our site', () => {
      cy.visit('/example-1');
      cy.get('h1').should('have.text', 'My Awesome Web Application')
    })
  })