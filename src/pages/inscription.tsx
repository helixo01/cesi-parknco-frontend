
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { TextInput } from "@/components/global/TextInput";
import { Logo } from "@/components/global/Logo";
import { Button } from "@/components/global/Button";
import { Division } from "@/components/global/Division";
import { Info } from "@/components/global/Info";
import { HelpText } from "@/components/global/HelpText";
import { colors } from "@/styles/colors";
import { authService } from "@/services/auth";
import { CheckboxInput } from "@/components/global/CheckboxInput";

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  confirmationMotDePasse: string;
  acceptConditions: boolean;
}

export default function Inscription() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmationMotDePasse: '',
    acceptConditions: false
  });
  const [infoMessage, setInfoMessage] = useState<string>('');
  const [infoType, setInfoType] = useState<'error' | 'success'>('error');
  const [showInfo, setShowInfo] = useState(false);

  const validateForm = (): boolean => {
    if (!formData.nom.trim()) {
      setInfoMessage('Le nom est requis');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    if (!formData.prenom.trim()) {
      setInfoMessage('Le prénom est requis');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    if (!formData.email.trim()) {
      setInfoMessage('L\'email est requis');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@(viacesi|cesi)\.fr$/;
    if (!emailRegex.test(formData.email)) {
      setInfoMessage('L\'email doit être une adresse CESI valide (contenant @viacesi.fr ou @cesi.fr)');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    if (!formData.motDePasse) {
      setInfoMessage('Le mot de passe est requis');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    if (formData.motDePasse.length < 8) {
      setInfoMessage('Le mot de passe doit contenir au moins 8 caractères');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    if (!formData.confirmationMotDePasse) {
      setInfoMessage('La confirmation du mot de passe est requise');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    if (formData.motDePasse !== formData.confirmationMotDePasse) {
      setInfoMessage('Les mots de passe ne correspondent pas');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    if (!formData.acceptConditions) {
      setInfoMessage('Vous devez accepter les conditions générales d\'utilisation');
      setInfoType('error');
      setShowInfo(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) return;

    try {
      await authService.register({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        motDePasse: formData.motDePasse,
      });

      setInfoMessage('Inscription réussie ! Redirection vers la page de connexion...');
      setInfoType('success');
      setShowInfo(true);

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setInfoMessage('Une erreur est survenue lors de l\'inscription');
      setInfoType('error');
      setShowInfo(true);
    }
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Réinitialiser le message d'erreur quand l'utilisateur commence à corriger
    setShowInfo(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo width={175} height={175} shape="circle" />
        </div>
        <Division variant="default" className="space-y-8">
          <Info 
            message={infoMessage} 
            type={infoType}
            show={showInfo}
          />
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <TextInput
              label="Nom"
              type="text"
              placeholder="Entrez votre nom"
              value={formData.nom}
              onChange={(value) => updateField("nom", value)}
              required={true}
            />
            <TextInput
              label="Prénom"
              type="text"
              placeholder="Entrez votre prénom"
              value={formData.prenom}
              onChange={(value) => updateField("prenom", value)}
              required={true}
            />
            <TextInput
              label="Email"
              type="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={(value) => updateField("email", value)}
              required={true}
            />
            <TextInput
              label="Mot de passe"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={formData.motDePasse}
              onChange={(value) => updateField("motDePasse", value)}
              required={true}
            />
            <TextInput
              label="Confirmer le mot de passe"
              type="password"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmationMotDePasse}
              onChange={(value) => updateField("confirmationMotDePasse", value)}
              required={true}
            />
            <CheckboxInput
              label="J'accepte les"
              linkText="conditions générales d'utilisation"
              linkHref="/conditions-generales"
              checked={formData.acceptConditions}
              onChange={(checked) => updateField("acceptConditions", checked)}
              required
              error={!formData.acceptConditions && showInfo ? "Vous devez accepter les conditions générales" : undefined}
            />
            <Button
              text="S'inscrire"
              variant="primary"
              onClick={() => handleSubmit(new Event('click') as unknown as React.MouseEvent)}
            />
          </form>
          <div className="space-y-4 text-center">
            <HelpText
              text="Déjà inscrit ?"
              linkText="Connectez-vous ici"
              linkHref="/login"
            />
            <HelpText
              text="Un problème ?"
              linkText="Contactez le support"
              linkHref="/support"
            />
          </div>
        </Division>
      </div>
    </div>
  );
} 
