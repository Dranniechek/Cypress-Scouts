describe('Basic functionality', () => {

    beforeEach(() => {
        // open website
        cy.visit('/')
        cy.intercept('POST', '/viewcart').as("viewcart");
        cy.intercept("POST", "/bycat").as("category");
        
    })

    //Cypress._.times(10, () => {
    it('Create new user', () => {
        
        const userName = ('Testuser' + Date.now())
        const password = 'password'
        
        cy.newUserRegistration(userName, password)

        // check that text "Sign up successful." appeared 
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('winAlert')
            //  Click "Sign up" button
            cy.get('#signInModal button.btn-primary').click()
            cy.get('@winAlert').should('be.calledWith', 'Sign up successful.')
            cy.get('.modal-open').should('not.exist')
          })      
             
        // non-valid case - attempt to register an existing user
        cy.newUserRegistration('Test', password)

        cy.get('#signInModal button.btn-primary').click()
        cy.get('@winAlert').should('be.calledWith', 'This user already exist.')
    
        
    })
//})

    it('Purchase of one item - phones', () => {

        cy.contains('.list-group-item', 'Phones').click()
        cy.wait('@category')

        // Open first product
        cy.contains('.hrefch', 'Samsung galaxy s6').click()
        
        cy.addProductToCart()
        cy.wait('@viewcart')

        // check if there is an item in the cart
        cy.contains('.table', 'Delete').should('be.visible')
        

        cy.placeAndPayOrder()

        // Checking for a successful purchase icon
        cy.contains('.sweet-alert', 'Thank you for your purchase!').should('be.visible')

        // Click "Ok" button
        cy.wait(1000)
        cy.get('button.confirm').click()
               
        // // check if main page open after purchase
         cy.url().should('include', 'index.html')

    })



    it('Purchase of one item - laptop', () => {

        cy.contains('.list-group-item', 'Laptops').click()
        cy.wait('@category')

        // Open first product
        cy.contains('.hrefch', 'Sony vaio i5').click()
        
        cy.addProductToCart()
        cy.wait('@viewcart')

        // check if there is an item in the cart
        cy.contains('.table', 'Delete').should('be.visible')

        cy.placeAndPayOrder()

        // Checking for a successful purchase icon
        cy.contains('.sweet-alert', 'Thank you for your purchase!').should('be.visible')

        // Click "Ok" button
        cy.wait(1000)
        cy.get('button.confirm').click()
       
        // check if main page open after purchase
        cy.url().should('include', 'index.html')

    })

})