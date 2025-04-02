import React, { useState } from "react";
import { Header } from "@/components/global/Header";
import { Division } from "@/components/global/Division";
import { FormInput } from "@/components/global/FormInput";
import { ProfilPic } from "@/components/global/ProfilPic";
import { Button } from "@/components/global/Button";
import { colors } from "@/styles/colors";

export default function InfoPerso() {
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

  const getYearOptions = (formation: string, specialite: string) => {
    if (formation === "personnel") return [];
    if (formation === "master") {
      return Array.from({ length: 5 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}ère année`,
      }));
    }
    if (formation === "cpi") {
      return Array.from({ length: 2 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}ère année`,
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
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@viacesi.fr",
    phone: "06 12 34 56 78",
    formation: "personnel",
    year: "",
    specialite: "",
    profilePic: null as string | null,
  });

  const [editingFields, setEditingFields] = useState<string[]>([]);
  const [initialData, setInitialData] = useState(formData);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Réinitialiser l'année et la spécialité si on change de formation
      if (field === "formation") {
        newData.year = "";
        newData.specialite = "";
      }

      // Réinitialiser la spécialité si on passe en CPI 1ère année
      if (field === "year" && formData.formation === "cpi" && value === "1") {
        newData.specialite = "";
      }

      return newData;
    });

    // Gérer l'état d'édition des champs
    if (field === "formation") {
      if (value === "personnel") {
        // Retirer formation des champs en édition si on revient à "personnel"
        setEditingFields(prev => prev.filter(f => f !== "formation"));
      } else if (!editingFields.includes("formation")) {
        // Ajouter formation aux champs en édition si on choisit une autre valeur
        setEditingFields(prev => [...prev, "formation"]);
      }
    } else if ((field === "year" || field === "specialite") && value && !editingFields.includes(field)) {
      setEditingFields(prev => [...prev, field]);
    }
  };

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      profilePic: imageUrl
    }));
    setIsImageChanged(true);
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
  };

  const handleSave = () => {
    setInitialData(formData);
    setEditingFields([]);
    setIsImageChanged(false);
    // Ici vous pourrez ajouter la logique pour sauvegarder les données
    console.log('Données sauvegardées:', formData);
  };

  const isEditing = editingFields.length > 0 || isImageChanged;
  const showYearSelect = formData.formation !== "personnel";
  const showSpecialiteSelect = formData.formation !== "personnel" && 
    !(formData.formation === "cpi" && formData.year === "1");

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes" 
          texteGras="Informations" 
        />

        <Division className="mt-8">
          <div className="flex justify-center">
            <ProfilPic 
              width={150}
              height={150}
              shape="circle"
              src={formData.profilePic}
              editable={true}
              onImageChange={handleImageChange}
            />
          </div>

          <div className="space-y-4 mt-8">
            <FormInput
              label="Prénom"
              type="text"
              value={formData.firstname}
              onChange={handleChange("firstname")}
              variant="light"
              editable={true}
              isEditing={editingFields.includes("firstname")}
              onEditClick={() => handleEditClick("firstname")}
            />

            <FormInput
              label="Nom"
              type="text"
              value={formData.lastname}
              onChange={handleChange("lastname")}
              variant="light"
              editable={true}
              isEditing={editingFields.includes("lastname")}
              onEditClick={() => handleEditClick("lastname")}
            />

            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              variant="light"
              editable={true}
              isEditing={editingFields.includes("email")}
              onEditClick={() => handleEditClick("email")}
            />

            <FormInput
              label="Téléphone"
              type="text"
              value={formData.phone}
              onChange={handleChange("phone")}
              variant="light"
              editable={true}
              isEditing={editingFields.includes("phone")}
              onEditClick={() => handleEditClick("phone")}
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
                options={getYearOptions(formData.formation, formData.specialite)}
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

            {isEditing && (
              <div className="flex gap-4 mt-8">
                <Button
                  text="Annuler"
                  variant="error"
                  onClick={handleCancel}
                  className="flex-1"
                />
                <Button
                  text="Enregistrer"
                  variant="primary"
                  onClick={handleSave}
                  className="flex-1"
                />
              </div>
            )}
          </div>
        </Division>
      </div>
    </div>
  );
}