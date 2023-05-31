describe('Basic functionality', () => {
    it('Create new user', () => {
        
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * timestamp);

        // open website
        cy.visit('https://www.demoblaze.com')

        // Click on "Sign up"
        cy.get('#signin2').click()
        
        // Fill in username and password
        cy.get('#sign-username').type('Testuser' + randomNumber.toString())
        cy.get('#sign-password').type('Passwordtest')

        // check that text "Sign up successful." appeared 
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('winAlert')
            //  Click "Sign up" button
            cy.xpath("//button[@type='button' and @onclick='register()']").click()
            cy.get('@winAlert').should('be.calledWith', 'Sign up successful.')
          })
        
    })
    
    it('Purchase of one item', () => {

        // open website
        cy.visit('https://www.demoblaze.com')

        // Open first product
        cy.xpath('//a[@href="prod.html?idp_=1" and @class="hrefch"]').click()

        //Click add to cart
        cy.xpath('//a[contains(@class, "btn-success")]').click()

        // Open Cart
        cy.get('#cartur').click()

        // check if there is an item in the cart
        cy.xpath('//*[contains(@onclick, "deleteItem")]').should('be.visible')

        // Click "Place Order"
        cy.xpath('//*[contains(@class, "btn-success")]').click()

        // Fill in all fields on the page
        cy.get('#name').type('Testuser')
        cy.get('#country').type('TestCountry')
        cy.get('#city').type('Testcity')
        cy.get('#card').type('1234432198766789')
        cy.get('#month').type('May')
        cy.get('#year').type('2023')

        // Click "Purchase" button
        cy.xpath('//*[contains(@onclick, "purchaseOrder")]').click()

        // Checking for a successful purchase icon
        cy.xpath('//*[contains(@class, "sa-placeholder")]').should('be.visible')

        // Click "Ok" button
        cy.xpath('//button[contains(@class, "confirm")]').click()
       // cy.get('body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button').click()
       // cy.contains('.confirm', 'OK').click();

        // check if main page open after purchase
        //cy.url().should('include', 'index.html')

    })

})