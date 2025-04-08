/// <reference types="cypress" />

describe('Page de connexion', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('devrait afficher le formulaire de connexion', () => {
    cy.get('[data-cy="email-input"]').should('exist')
    cy.get('[data-cy="password-input"]').should('exist')
    cy.get('[data-cy="login-button"]').should('exist')
  })

  it('devrait afficher une erreur avec des identifiants invalides', () => {
    cy.get('[data-cy="email-input"]').type('test@invalid.com')
    cy.get('[data-cy="password-input"]').type('wrongpassword')
    cy.get('[data-cy="login-button"]').click()
    cy.wait('@loginRequest')
    cy.get('[data-cy="error-message"]').should('be.visible')
  })

  it('devrait se connecter avec des identifiants valides', () => {
    cy.get('[data-cy="email-input"]').type('test@example.com')
    cy.get('[data-cy="password-input"]').type('validpassword')
    cy.get('[data-cy="login-button"]').click()
    cy.wait('@loginRequest')
    cy.wait('@getCurrentUser')
    cy.url().should('match', /\/(home|admin\/statistiques)$/)
  })
}) 