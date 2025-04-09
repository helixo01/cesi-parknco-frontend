import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/auth";

interface LoginFormState {
  email: string;
  password: string;
  infoMessage: string;
  infoType: "info" | "error" | "success";
  showInfo: boolean;
}

export const useLoginForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
    infoMessage: "",
    infoType: "info",
    showInfo: false,
  });

  const validateForm = () => {
    if (!formState.email || !formState.password) {
      setFormState((prev) => ({
        ...prev,
        infoMessage: "Les champs email et mot de passe sont obligatoires",
        infoType: "error",
        showInfo: true,
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const loginResponse = await authService.login({
        email: formState.email,
        password: formState.password,
      });
      
      // Récupérer l'utilisateur connecté et son rôle
      const user = await authService.getCurrentUser();
      
      // Rediriger en fonction du rôle
      if (user.role === 'admin_user') {
        await router.push('/admin/statistiques');
      } else {
        await router.push('/home');
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        infoMessage: "Une erreur est survenue lors de la connexion",
        infoType: "error",
        showInfo: true,
      }));
    }
  };

  const updateField = (field: keyof LoginFormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      showInfo: false, // Cache le message d'erreur quand l'utilisateur modifie un champ
    }));
  };

  return {
    formState,
    updateField,
    handleSubmit,
  };
}; 