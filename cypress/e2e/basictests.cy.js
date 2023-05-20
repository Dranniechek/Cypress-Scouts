describe('Basic functionality', () => {
    it('Create new user', () => {
        cy.visit('https://www.demoblaze.com')

        cy.get('#signin2').click()
        
        cy.get('#sign-username').type('Testuser' + Math.random(1000))
        cy.get('#sign-password').type('Passwordtest')

        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
        
    })
})