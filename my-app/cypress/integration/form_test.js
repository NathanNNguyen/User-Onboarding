describe('Test our inputs and submit our form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Add text to input and submit form for my data', () => {
    cy.get(`input[name='name']`).type('Nathan Nguyen').should('have.value', 'Nathan Nguyen');
    cy.get(`input[name='email']`).type('n@n.com').should('have.value', 'n@n.com');
    cy.get(`#role`).select('Backend-Dev').should('have.value', 'Backend-Dev');
    // cy.get('.terms > input').check().should('be.checked');
    cy.get(`[type="checkbox"]`).check().should('be.checked');
    cy.get('button').click();
  });


});