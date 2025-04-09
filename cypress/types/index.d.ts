/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare module 'cypress' {
  export interface Cypress {
    Command: {
      add(name: string, fn: (...args: any[]) => void): void;
    };
  }
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<void>
  }
} 