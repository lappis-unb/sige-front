import login from '../elements/login.elements'

class LoginPage {
    login(){
        cy.visit('http://sige.lappis.rocks/')
        cy.get(login.email_ipt).type(Cypress.env('emailProd'))
        cy.get(login.senha_ipt).type(Cypress.env('senhaProd'))
        cy.get(login.entrar_btn).click()
        
    }
}

export default new LoginPage();
