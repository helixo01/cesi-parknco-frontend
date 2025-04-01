interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    // TODO: Implémenter la logique de connexion avec le backend
    return Promise.resolve();
  },
}; 