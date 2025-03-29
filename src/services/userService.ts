interface UserData {
  prenom: string;
  // Autres données utilisateur à ajouter plus tard
}

export const userService = {
  /**
   * Récupère les données de l'utilisateur connecté
   * @returns Promise<UserData> Les données de l'utilisateur
   */
  async getUserData(): Promise<UserData> {
    try {
      // TODO: Remplacer par l'appel API réel
      // const response = await fetch('/api/user');
      // const data = await response.json();
      // return data;
      
      // Pour le moment, on retourne des données temporaires
      return {
        prenom: "Jacques"
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
      throw error;
    }
  }
}; 