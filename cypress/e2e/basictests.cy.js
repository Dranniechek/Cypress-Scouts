describe('Basic functionality', () => {

    beforeEach(() => {
        // open website
        cy.visit('/')
    })

    //Cypress._.times(10, () => {
    it('Create new user', () => {
        
        const userName = ('Testuser' + Date.now())
        
        // Click on "Sign up"
        cy.get('#signin2').click()
        
        // Fill in username and password
        
        cy.get('#signInModal').should('be.visible')
        cy.get('#sign-username').invoke('val', userName)
        cy.get('#sign-password').invoke('val', 'Passwordtest')

        // check that text "Sign up successful." appeared 
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('winAlert')
            //  Click "Sign up" button
            cy.get('#signInModal button.btn-primary').click()
            cy.get('@winAlert').should('be.calledWith', 'Sign up successful.')
          })
        
    })
//})
    
    it('Purchase of one item', () => {

        // Open first product
        cy.contains('.hrefch', 'Samsung galaxy s6').click()
        
        //Click add to cart
        cy.get('#tbodyid a.btn-success').click()

        // Open Cart
        cy.get('#cartur').click()

        // check if there is an item in the cart
        cy.contains('.table', 'Delete').should('be.visible')

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

        // Checking for a successful purchase icon
        cy.contains('.sweet-alert', 'Thank you for your purchase!').should('be.visible')

        // Click "Ok" button
        cy.wait(1000)
        cy.get('button.confirm').click()
       
        // check if main page open after purchase
        cy.url().should('include', 'index.html')

    })

})