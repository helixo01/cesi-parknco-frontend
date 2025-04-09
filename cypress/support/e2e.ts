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

beforeEach(() => {
  // Mock de la réponse de l'API pour la connexion avec des identifiants invalides
  cy.intercept('POST', 'http://localhost:5001/api/auth/login', (req) => {
    if (req.body.email === 'test@invalid.com') {
      req.reply({
        statusCode: 401,
        body: {
          message: 'Identifiants invalides'
        }
      })
    } else {
      req.reply({
        statusCode: 200,
        body: {
          token: 'fake-jwt-token',
          user: {
            id: '1',
            email: 'test@example.com',
            role: 'user'
          }
        }
      })
    }
  }).as('loginRequest')

  // Mock de la réponse de l'API pour la récupération de l'utilisateur
  cy.intercept('GET', 'http://localhost:5001/api/auth/me', {
    statusCode: 200,
    body: {
      user: {
        id: '1',
        email: 'test@example.com',
        role: 'user'
      }
    }
  }).as('getCurrentUser')
}) 