/// <reference types="cypress" />

// Pour plus d'exemples de commandes personnalisées, visitez:
// https://on.cypress.io/custom-commands

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-cy="email-input"]').type(email)
  cy.get('[data-cy="password-input"]').type(password)
  cy.get('[data-cy="login-button"]').click()
})

export {} 