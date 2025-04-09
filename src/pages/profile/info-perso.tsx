import React, { useState, useEffect } from "react";
import { Header } from "@/components/global/Header";
import { Division } from "@/components/global/Division";
import { FormInput } from "@/components/global/FormInput";
import { ProfilPic } from "@/components/global/ProfilPic";
import { Button } from "@/components/global/Button";
import { colors } from "@/styles/colors";
import { userService } from "@/services/userService";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export default function InfoPerso() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  const formationOptions = [
    { value: "personnel", label: "Personnel" },
    { value: "master", label: "Master" },
    { value: "cpi", label: "CPI" },
    { value: "fise", label: "FISE" },
    { value: "fisa", label: "FISA" },
  ];

  const specialiteOptions = [
    { value: "informatique", label: "Informatique" },
    { value: "btp", label: "BTP" },
    { value: "generaliste", label: "Généraliste" },
  ];

  const getYearOptions = (formation: string) => {
    if (formation === "personnel") return [];
    if (formation === "master") {
      return Array.from({ length: 2 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}${i === 0 ? 'ère' : 'ème'} année`,
      }));
    }
    if (formation === "cpi") {
      return Array.from({ length: 2 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}${i === 0 ? 'ère' : 'ème'} année`,
      }));
    }
    if (formation === "fise" || formation === "fisa") {
      return Array.from({ length: 3 }, (_, i) => ({
        value: String(i + 3),
        label: `${i + 3}ème année`,
      }));
    }
    return [];
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    formation: "personnel",
    year: "",
    specialite: "",
    profilePicture: null as string | null,
  });

  const [editingFields, setEditingFields] = useState<string[]>([]);
  const [initialData, setInitialData] = useState(formData);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Fonction de validation de l'email
  const validateEmail = (email: string) => {
    const validDomains = ['@cesi.fr', '@viacesi.fr'];
    const isValidDomain = validDomains.some(domain => email.toLowerCase().endsWith(domain));
    return isValidDomain;
  };

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUserData();
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          formation: userData.formation || "personnel",
          year: userData.year || "",
          specialite: userData.specialite || "",
          profilePicture: userData.profilePicture || null,
        });
        setInitialData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          formation: userData.formation || "personnel",
          year: userData.year || "",
          specialite: userData.specialite || "",
          profilePicture: userData.profilePicture || null,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, authLoading, router]);

  const handleChange = (field: string) => (value: string) => {
    if (field === 'email') {
      setEmailError(null);
      if (!validateEmail(value)) {
        setEmailError('L\'email doit se terminer par @cesi.fr ou @viacesi.fr');
      }
    }

    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      if (field === "formation") {
        newData.year = "";
        newData.specialite = "";
      }

      if (field === "year" && formData.formation === "cpi" && value === "1") {
        newData.specialite = "";
      }

      return newData;
    });

    if (field === "formation") {
      if (value === "personnel") {
        setEditingFields(prev => prev.filter(f => f !== "formation"));
      } else if (!editingFields.includes("formation")) {
        setEditingFields(prev => [...prev, "formation"]);
      }
    } else if ((field === "year" || field === "specialite") && value && !editingFields.includes(field)) {
      setEditingFields(prev => [...prev, field]);
    }
  };

  const handleImageChange = async (file: File) => {
    try {
      const imageUrl = await userService.updateProfilePicture(file);
      setFormData(prev => ({
        ...prev,
        profilePicture: imageUrl
      }));
      setIsImageChanged(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour de l\'image');
    }
  };

  const handleEditClick = (field: string) => {
    if (!editingFields.includes(field)) {
      setEditingFields([...editingFields, field]);
      setInitialData(formData);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setEditingFields([]);
    setIsImageChanged(false);
    setError(null);
    setEmailError(null);
  };

  const handleSave = async () => {
    try {
      // Vérifier l'email avant la sauvegarde
      if (editingFields.includes('email') && !validateEmail(formData.email)) {
        setError('L\'email doit se terminer par @cesi.fr ou @viacesi.fr');
        return;
      }

      const updatedData = await userService.updateUserData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        formation: formData.formation === "personnel" ? undefined : formData.formation,
        year: formData.year || undefined,
        specialite: formData.specialite || undefined,
      });

      setFormData(prev => ({
        ...prev,
        ...updatedData,
      }));
      setInitialData(prev => ({
        ...prev,
        ...updatedData,
      }));
      setEditingFields([]);
      setIsImageChanged(false);
      setError(null);
      setEmailError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background.page }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  const isEditing = editingFields.length > 0 || isImageChanged;
  const showYearSelect = formData.formation !== "personnel";
  const showSpecialiteSelect = formData.formation !== "personnel" && 
    !(formData.formation === "cpi" && formData.year === "1");

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes" 
          texteGras="informations" 
        />

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg">
            {error}
          </div>
        )}

        <Division className="mt-8">
          <div className="flex justify-center">
            <ProfilPic 
              width={150}
              height={150}
              shape="circle"
              src={formData.profilePicture}
              editable={true}
              onImageChange={handleImageChange}
            />
          </div>

          <div className="space-y-4 mt-8">
            <FormInput
              label="Prénom"
              type="text"
              value={formData.firstName}
              onChange={handleChange("firstName")}
              variant="light"
              editable={true}
              isEditing={editingFields.includes("firstName")}
              onEditClick={() => handleEditClick("firstName")}
              required={true}
            />

            <FormInput
              label="Nom"
              type="text"
              value={formData.lastName}
              onChange={handleChange("lastName")}
              variant="light"
              editable={true}
              isEditing={editingFields.includes("lastName")}
              onEditClick={() => handleEditClick("lastName")}
              required={true}
            />

            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              error={emailError || undefined}
              disabled={!editingFields.includes("email")}
              editable
              isEditing={editingFields.includes("email")}
              onEditClick={() => handleEditClick("email")}
              required={true}
              variant="light"
            />

            <FormInput
              label="Type de formation"
              type="select"
              value={formData.formation}
              onChange={handleChange("formation")}
              variant="light"
              options={formationOptions}
              editable={true}
              isEditing={editingFields.includes("formation")}
              onEditClick={() => handleEditClick("formation")}
            />

            {showYearSelect && (
              <FormInput
                label="Année"
                type="select"
                value={formData.year}
                onChange={handleChange("year")}
                variant="light"
                options={getYearOptions(formData.formation)}
                editable={true}
                isEditing={editingFields.includes("year")}
                onEditClick={() => handleEditClick("year")}
              />
            )}

            {showSpecialiteSelect && (
              <FormInput
                label="Spécialité"
                type="select"
                value={formData.specialite}
                onChange={handleChange("specialite")}
                variant="light"
                options={specialiteOptions}
                editable={true}
                isEditing={editingFields.includes("specialite")}
                onEditClick={() => handleEditClick("specialite")}
              />
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                text="Annuler"
                onClick={handleCancel}
                variant="error"
              />
              <Button
                text="Enregistrer"
                onClick={handleSave}
                variant="primary"
              />
            </div>
          )}
        </Division>
      </div>
    </div>
  );
}