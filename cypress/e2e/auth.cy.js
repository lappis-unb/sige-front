describe('Cadastro', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.contains('Cadastre-se').click()
    cy.url()
      .should('include','register')
  });
  
  it('Caminho feliz', () => {
    cy.get('[aria-label="Nome completo"]').type('Usuário teste')
    cy.get('[aria-label="Email"]').type('teste@gmail.com')
    cy.get('[aria-label="Senha"]').type('teste123')
    cy.get('[aria-label="Confirme a senha"]').type('teste123')
    cy.contains('Cadastrar').click()
  });

  it('Senhas não coincidem', () => {
    cy.get('[aria-label="Nome completo"]').type('Usuário teste')
    cy.get('[aria-label="Email"]').type('usuario@email.com')
    
    cy.get('[aria-label="Senha"]').type('teste12343')
    cy.get('[aria-label="Confirme a senha"]').type('teste123')
    
    cy.contains('Cadastrar').click()

    cy.contains('Confirmação deve ser iqual a senha informada')
      .should('be.visible')
  });

  describe('Campos obrigatórios', () => {
    it('Nome', () => {
      cy.contains('Cadastrar').click()
      cy.contains('Insira seu nome completo.')
        .should('be.visible')
    });

    it('Email', () => {
      cy.get('[aria-label="Nome completo"]').type('teste')

      cy.contains('Cadastrar').click()
      cy.contains('Insira um email válido.')
        .should('be.visible')
    });
    
    it('Senha', () => {
    cy.get('[aria-label="Nome completo"]').type('Usuário teste')
    cy.get('[aria-label="Email"]').type('usuario@email.com')

    cy.contains('Cadastrar').click()
    cy.contains('Insira uma senha com ao menos 8 caracteres.')
      .should('be.visible')
    });
    
    it('Confirme a senha', () => {
    cy.get('[aria-label="Nome completo"]').type('Usuário teste')
    cy.get('[aria-label="Email"]').type('usuario@email.com')
    cy.get('[aria-label="Senha"]').type('teste123')

    cy.contains('Cadastrar').click()
    cy.contains('Insira uma senha com ao menos 8 caracteres.')
      .should('be.visible')
    });
  });
})

describe('Esqueci minha senha', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.contains('Esqueceu sua senha?').click()
    
    cy.url().should('include','forgotten_password')
  });
  
  it('Caminho feliz', () => {
    cy.get('[aria-label="Email"]').type('teste@gmail.com')
    cy.contains('Recuperar').click()
  });
  
  it('Email obrigatório', () => {
    cy.contains('Recuperar').click()
    cy.contains('Insira um email válido.')    
    .should('be.visible')
  });
  
  it('Email inválido', () => {
    cy.get('[aria-label="Email"]').type('email teste.com')
    cy.contains('Recuperar').click()
    cy.contains('Insira um email válido.')    
      .should('be.visible')
  });
});

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('Caminho feliz', () => {
    //substituir por dados puxados pelo .env
    cy.get('[aria-label="Email"]').type('teste@gmail.com')
    cy.get('[aria-label="Senha"]').type('senhateste123')
    
    cy.contains('Entrar').click()
  });
  
  context('Campos obrigatórios', () => {
    it('Email', () => {
      cy.contains('Entrar').click()

      cy.contains('Insira um email válido.')
        .should('be.visible')
    });
    
    it('Senha', () => {
      cy.get('[aria-label="Email"]').type('teste@gmail.com')
      cy.contains('Entrar').click()

      cy.contains('Insira uma senha com ao menos 8 caracteres.')
        .should('be.visible')
    });
  });

  context('Dados incorretos', () => {
    it('Email', () => {
      cy.get('[aria-label="Email"]').type('123421312@gmail.com')
      cy.get('[aria-label="Senha"]').type('123123123')
      cy.contains('Entrar').click()
      
      cy.contains('Falha ao acessar sua conta. Tente novamente.')
        .should('be.visible')
    });

    it('Senha', () => {
      cy.get('[aria-label="Email"]').type('teste@gmail.com')
      cy.get('[aria-label="Senha"]').type('0000000000')
      cy.contains('Entrar').click()

      cy.contains('Falha ao acessar sua conta. Tente novamente.')
        .should('be.visible')
    });
  });
});