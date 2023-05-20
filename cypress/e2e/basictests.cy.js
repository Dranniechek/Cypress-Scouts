describe('Basic functionality', () => {
    it('Create new user', () => {
        cy.visit('https://www.demoblaze.com')

        cy.get('#signin2').click()
        
        cy.get('#sign-username').type('Testuser' + Math.random(1000))
        cy.get('#sign-password').type('Passwordtest')

        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
        
    })
    
    it('Purchase of one item', () => {

        cy.visit('https://www.demoblaze.com')

        cy.get(':nth-child(1) > .card > :nth-child(1) > .card-img-top').click()

        cy.get('.col-sm-12 > .btn').click()

        cy.get('#cartur').click()
        cy.get('.col-lg-1 > .btn').click()

        cy.get('#name').type('Testuser')
        cy.get('#country').type('TestCountry')
        cy.get('#city').type('Testcity')
        cy.get('#card').type('1234432198766789')
        cy.get('#month').type('May')
        cy.get('#year').type('2023')

        cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()

        cy.get('.confirm').click()

    })

})