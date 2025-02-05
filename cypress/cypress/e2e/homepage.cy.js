describe('Home Page Tests', () => {
    it('should navigate to all example pages from the home page', () => {
      cy.visit('/');
      cy.contains('Example 1: simple assertion').click();
      cy.url().should('include', '/example-1');
      cy.go('back');
  
      cy.contains('Example 2: text input').click();
      cy.url().should('include', '/example-2');
      cy.go('back');
  
      cy.contains('Example 3: multiple inputs').click();
      cy.url().should('include', '/example-3');
      cy.go('back');
  
      cy.contains('Example 4: Click, check, select').click();
      cy.url().should('include', '/example-4');
    });
  });
  