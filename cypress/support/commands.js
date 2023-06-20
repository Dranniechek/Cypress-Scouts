// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('newUserRegistration', (userName, password) => {
    // Click on "Sign up"
    cy.get('#signin2').click()
    // Fill in username and password
    cy.get('#signInModal').should('be.visible')
    cy.get('#sign-username').invoke('val', userName)
    cy.get('#sign-password').invoke('val', password)
})

Cypress.Commands.add('addProductToCart', () => {
    //Click add to cart
    cy.get('#tbodyid a.btn-success').click()

    // Open Cart
    cy.get('#cartur').click()

})

Cypress.Commands.add('placeAndPayOrder', () => {
    // Click "Place Order"
    cy.get('#page-wrapper button.btn-success').click()

    // Fill in all fields on the page
    cy.get('#name').type('Testuser')
    cy.get('#country').type('TestCountry')
    cy.get('#city').type('Testcity')
    cy.get('#card').type('1234432198766789')
    cy.get('#month').type('May')
    cy.get('#year').type('2023')

    // Click "Purchase" button
    cy.get('#orderModal button.btn-primary').click()
})