/// <reference types="cypress" />

import './commands'

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      // Ajoutez ici vos commandes personnalisées
      login(email: string, password: string): Chainable<void>
    }
  }
}

// Exemple de commande personnalisée pour la connexion
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-cy="email-input"]').type(email)
  cy.get('[data-cy="password-input"]').type(password)
  cy.get('[data-cy="login-button"]').click()
}) 