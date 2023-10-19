describe("Página Principal", () => {
  beforeEach(() => {
    cy.setCookie(
        "userStore",
        "%7B%22userStore%22%3A%7B%22userToken%22%3A%229c977df2abfccd2d3d2df887b5332ebf2650b723%22%2C%22userID%22%3A258%2C%22username%22%3A%22Lucas%20Rodrigues%20Cardoso%22%2C%22useremail%22%3A%22cardosolucasrodrigues%40gmail.com%22%2C%22is_superuser%22%3Afalse%2C%22currentPage%22%3A%22Medidores%22%2C%22userAuth%22%3Afalse%7D%7D"
      );
    cy.visit('http://localhost:8080/');
  });
  context("Acessar os Cards", () => {
    it("Acessar Medidores", () => {
      cy.log("clico no card de medidores");
      cy.get(".card-text:contains(Medidores)").click();
      cy.log("garanto que a página para que fui redirecionado é a de medidores");
      cy.get(".q-toolbar__title").should("have.text", "Medidores");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/transductor_list");
    });
    it("Acessar Custo Total", () => {
      cy.log("clico no card de Custo Total");
      cy.get(".card-text:contains(Custo Total)").click();
      cy.log("garanto que a página para que fui redirecionado é a de Custo total");
      cy.get(".q-toolbar__title").should("have.text", "Custo Total");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/total_cost");
    });
    it("Acessar Curva de Carga", () => {
      cy.log("clico no card de Curva de carga");
      cy.get(".card-text:contains(Curva de Carga)").click();
      cy.log("garanto que a página para que fui redirecionado é a de Curva de carga");
      cy.get(".q-toolbar__title").should("have.text", "Curva de Carga");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/energy_consumption");
    });
    it("Acessar Relatórios", () => {
      cy.log("clico no card de Relatórios");
      cy.get(".card-text:contains(Relatórios)").click();
      cy.log("garanto que a página para que fui redirecionado é a de Relatórios");
      cy.get(".q-toolbar__title").should("have.text", "Relatório");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/reports");
    });
  });
  context("Acessar elementos Side Bar", () => {
    it("Acessar Início", () => {
      cy.log("Acesso medidores para depois voltar para o início pela side");
      cy.get(".card-text:contains(Medidores)").click();
      cy.url().should("include", "/transductor_list");
      cy.get("aside").trigger("mouseover");
      cy.get("aside").contains("Início").click({force:true});
      cy.log("garanto que a página para que fui redirecionado é a de Início");
      cy.get(".q-toolbar__title").should("have.text", "Início");
      cy.log("Não testo a url pq não existe path para a página de ínicio: /");
    });
    it("Acessar Medidores", () => {
      cy.log("Passo o mouse pela side para ela abrir e clico em Medidores");
      cy.get("aside").trigger("mouseover");
      cy.get("aside").contains("Medidores").click();
      cy.log(
        "garanto que a página para que fui redirecionado é a de medidores"
      );
      cy.get(".q-toolbar__title").should("have.text", "Medidores");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/transductor_list");
    });
    it("Acessar Custo Total", () => {
      cy.log("Passo o mouse pela side para ela abrir e clico em Custo Total");
      cy.get("aside").trigger("mouseover");
      cy.get("aside").contains("Custo Total").click();
      cy.log(
        "garanto que a página para que fui redirecionado é a de Custo total"
      );
      cy.get(".q-toolbar__title").should("have.text", "Custo Total");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/total_cost");
    });
    it("Acessar Curva de Carga", () => {
      cy.log(
        "Passo o mouse pela side para ela abrir e clico em Curva de Carga"
      );
      cy.get("aside").trigger("mouseover");
      cy.get("aside").contains("Curva de Carga").click();
      cy.log(
        "garanto que a página para que fui redirecionado é a de Curva de carga"
      );
      cy.get(".q-toolbar__title").should("have.text", "Curva de Carga");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/energy_consumption");
    });
    it("Acessar Relatórios", () => {
      cy.log("Passo o mouse pela side para ela abrir e clico em Relatórios");
      cy.get("aside").trigger("mouseover");
      cy.get("aside").contains("Relatórios").click();
      cy.log(
        "garanto que a página para que fui redirecionado é a de Relatórios"
      );
      cy.get(".q-toolbar__title").should("have.text", "Relatório");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/reports");
    });
    it("Acessar Sobre o Projeto", () => {
      cy.log("Passo o mouse pela side para ela abrir e clico em Sobre o Projeto");
      cy.get("aside").trigger("mouseover");
      cy.get("aside").contains("Sobre o Projeto").click();
      cy.log("garanto que a página para que fui redirecionado é a de Sobre o Projeto");
      cy.get(".q-toolbar__title").should("have.text", "Sobre");
      cy.log("garanto também que a url está certa");
      cy.url().should("include", "/about");
    });
    it("Deslogar", () => {
      cy.log("clico no botão de logout");
      cy.get("aside").contains("Sair").click();
      cy.log("garanto que eu fui deslogado usando a toast verde que aparece na tela");
      cy.contains("Você saiu da sua conta.").should("be.visible");
    });
  });
  context("Acessar elementos Top Bar", () => {
    it("Alterar Dados", () => {
    cy.get('.float-right').click()
    });
    it('Sair', () => {

        
    });
  });
});
