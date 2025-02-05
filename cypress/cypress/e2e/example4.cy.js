describe('Example 4: Click, Check, Select', () => {
    beforeEach(() => {
        cy.visit('/example-4');
    });

    it('should handle click and double-click events', () => {
      cy.get('[data-cy=box-1-items-list]')
        .contains('Option One')
        .click()
        .should('have.css', 'background-color', 'rgb(221, 221, 221)');
      
      cy.get('[data-cy=box-1-items-list]')
        .contains('Option One')
        .dblclick();
      cy.get('[data-cy=box-1-selected-name]').should('have.text', 'Option One');
    });

    it('sets the header text to the item name when double clicked', () => {
        cy.get('ul[data-cy=box-1-items-list] > li').eq(2).dblclick();
        cy.get('span[data-cy=box-1-selected-name]').invoke('text').should('equal', 'Option Three');
    });

    it('should handle checkbox selection', () => {
      cy.get('[data-cy=box-2-checkboxes]').contains('Option One').click();
      cy.get('[data-cy=box-2-selected-count]').should('have.text', '1');
  
      cy.get('[data-cy=box-2-checkboxes]').contains('Option Two').click();
      cy.get('[data-cy=box-2-selected-count]').should('have.text', '2');
    });

    it('displays the correct number of checked options', () => {
        cy.get('span[data-cy=box-2-selected-count]').invoke('text').should('equal', '0');

        cy.get('div[data-cy=box-2-checkboxes] input[type=checkbox]').eq(0).check();
        cy.get('div[data-cy=box-2-checkboxes] input[type=checkbox]').eq(1).check();
        cy.get('span[data-cy=box-2-selected-count]').invoke('text').should('equal', '2');

        cy.get('div[data-cy=box-2-checkboxes] input[type=checkbox]').eq(1).uncheck();
        cy.get('span[data-cy=box-2-selected-count]').invoke('text').should('equal', '1');
    });
  
    it('should handle dropdown selection', () => {
      cy.get('[data-cy=box-3-dropdown]').select('Option Two');
      cy.get('[data-cy=box-3-selected-name]').should('have.text', 'Option Two');
    });

    it('displays the currently selected dropdown option', () => {
        cy.get('select[data-cy=box-3-dropdown]').select('Option Two');
        cy.get('span[data-cy=box-3-selected-name]').invoke('text').should('equal', 'Option Two');
    });
  
    it('should handle mouseover events', () => {
      cy.get('[data-cy=box-4-items-list]').contains('Option Three').trigger('mouseover');
      cy.get('[data-cy=box-4-selected-name]').should('have.text', 'Option Three');
    });

    it('sets the header text to the item name when hovered over', () => {
        cy.get('ul[data-cy=box-4-items-list] > li').eq(2).trigger('mouseover');
        cy.get('span[data-cy=box-4-selected-name]').invoke('text').should('equal', 'Option Three');
    });

    it('has a list in box 1', () => {
        cy.get('[data-cy=box-1-items-list]').should('exist');
    });

    it('displays three options in box 1', () => {
        cy.get('[data-cy=box-1-items-list] > li').should('have.length', 3);
    });
  });
  