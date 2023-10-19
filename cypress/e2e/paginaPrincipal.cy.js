const LoginPage = require('../pages/login.pages');
describe('Página Principal', () => {
    beforeEach(() => {
        cy.viewport(1800, 1200) 
        LoginPage.login();
        
    });

    it('teste', () => {
        cy.contains('Voce está autenticado.').should('be.visible')
        
    });

});