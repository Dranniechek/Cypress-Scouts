describe('Basic functionality', () => {

    beforeEach(() => {
        // open website
        cy.visit('/')
        cy.intercept("POST", "/signup").as("signup");
        
    })

    it('Create new user', () => {
        const userName = ('Testuser' + Date.now())
        const password = 'password'
        cy.newUserRegistration(userName, password)
        // check that text "Sign up successful." appeared 
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('winAlert')
            //  Click "Sign up" button
            cy.get('#signInModal button.btn-primary').click()
            cy.wait('@signup')
            cy.get('@winAlert').should('be.calledWith', 'Sign up successful.')
          })      
    })

    it('Attempt to register an existing user', () => {
        const password = 'password'
        cy.newUserRegistration('Test', password)
        // check that text "This user already exist." appeared 
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('winAlert')
            //  Click "Sign up" button
            cy.get('#signInModal button.btn-primary').click()
            cy.wait('@signup')
            cy.get('@winAlert').should('be.calledWith', 'This user already exist.')
          })
    })


})