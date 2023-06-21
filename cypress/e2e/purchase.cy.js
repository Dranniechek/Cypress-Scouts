describe('Purchase of products', () => {

    beforeEach(() => {
        // open website
        cy.visit('/')
        cy.intercept('POST', '/viewcart').as("viewcart");
        cy.intercept("POST", "/bycat").as("category");
        
    })

    it('Purchase of one item - phones', () => {

        cy.contains('.list-group-item', 'Phones').click()
        cy.wait('@category')     
        cy.addProductToCart('Samsung galaxy s6')
        cy.placeAndPayOrder()
        // Checking for a successful purchase icon
        cy.contains('.sweet-alert', 'Thank you for your purchase!').should('be.visible')
        // Click "Ok" button
        cy.wait(1000)
        cy.get('button.confirm').click()               
        // check if main page open after purchase
         cy.url().should('include', 'index.html')

    })

    it('Purchase of one item - laptop', () => {

        cy.contains('.list-group-item', 'Laptops').click()
        cy.wait('@category')        
        cy.addProductToCart('Sony vaio i5')        
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