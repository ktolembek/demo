describe('Example 2: Text Input', () => {
    it('should update the character counter correctly', () => {
      cy.visit('/example-2');
      cy.get('[data-cy=max-char-input]').type('Hello');
      cy.get('[data-cy=chars-left-count]').should('have.text', '10');
      cy.get('[data-cy=max-char-input]').clear().type('Test Text');
      cy.get('[data-cy=chars-left-count]').should('have.text', '6');
    });
    it('displays the appropriate remaining characters count', () => {
        cy.visit('/example-2');
        cy.get('span').invoke('text').should('equal', '15');
        cy.get('input').type('Hello').debug();
        cy.get('span').invoke('text').should('equal', '10');
        cy.get('input').type('Hello')
        cy.get('span').invoke('text').should('equal', '5');
        cy.get('input').type('Hello')
        cy.get('span').invoke('text').should('equal', '0');
        cy.get('input').type('Hello')
        cy.get('input').should('have.value', 'HelloHelloHello')
        cy.get('span').invoke('text').should('equal', '0');
      });
  });
  