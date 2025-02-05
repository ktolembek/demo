describe('Example 3: Multiple Text Inputs', () => {
    it('should update the character counter for both inputs independently', () => {
      cy.visit('/example-3');
      cy.get('[data-cy=input-first-name]').type('John');
      cy.get('[data-cy=first-name-chars-left-count]').should('have.text', '11');
  
      cy.get('[data-cy=input-last-name]').type('Doe');
      cy.get('[data-cy=last-name-chars-left-count]').should('have.text', '12');
    });
  });
  describe('Assert greetings', () => {
    beforeEach(() => {
        cy.visit('/example-3');
        cy.get('input[data-cy=name-input]').as('input');
        cy.get('span[data-cy=name-greeting]').as('greeting');
    });

    it('doesn\'t display any message when the text input is empty', () => {
      cy.get('@input').should('have.value', '')
      cy.get('@greeting').invoke('text').should('equal', '');
    })

    it('displays a greeting when there is something inside the input', () => {
        cy.get('@input').type('Ken');
        cy.get('@greeting').invoke('text').should('equal', 'Hello, Ken!');
    });
  })