import React, { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiArrowLeft, FiCheck, FiX, FiEdit2 } from "react-icons/fi";

export default function PersonalInfo() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "06 12 34 56 78",
    education: {
      type: "CESI",
      year: "2024",
      specialty: "Informatique",
    },
    customEducation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [tempData, setTempData] = useState({ ...formData });

  const educationTypes = ["CESI", "Université", "École d'ingénieur", "BTS", "DUT", "Autre"];
  const specialties = ["Informatique", "Mécanique", "Électronique", "Génie civil", "Commerce", "Autre"];
  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!/^[A-Za-zÀ-ÿ\s-]{2,}$/.test(tempData.firstName)) {
      newErrors.firstName = "Le prénom doit contenir au moins 2 caractères et ne pas contenir de chiffres";
    }

    if (!/^[A-Za-zÀ-ÿ\s-]{2,}$/.test(tempData.lastName)) {
      newErrors.lastName = "Le nom doit contenir au moins 2 caractères et ne pas contenir de chiffres";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(tempData.phone)) {
      newErrors.phone = "Le numéro de téléphone n'est pas valide (format français)";
    }

    if (tempData.education.type === "Autre" && !tempData.customEducation) {
      newErrors.customEducation = "Veuillez préciser votre type d'éducation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setTempData({ ...formData });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (validateForm()) {
      setFormData({ ...tempData });
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleCancel = () => {
    setTempData({ ...formData });
    setIsEditing(false);
    setErrors({});
  };

  const handleChange = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEducationChange = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value,
      },
    }));
  };

  const FormField = ({ 
    label, 
    value, 
    error, 
    type = "text",
    onChange,
    options,
    showCustomField = false,
    customValue = "",
    onCustomChange,
  }: { 
    label: string;
    value: string;
    error?: string;
    type?: string;
    onChange: (value: string) => void;
    options?: string[];
    showCustomField?: boolean;
    customValue?: string;
    onCustomChange?: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <label className="text-gray-600 font-medium">{label}</label>
      {isEditing ? (
        <div className="space-y-2">
          {options ? (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
              style={{ borderColor: error ? "red" : colors.primary.main }}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
              style={{ borderColor: error ? "red" : colors.primary.main }}
            />
          )}
          {showCustomField && value === "Autre" && onCustomChange && (
            <input
              type="text"
              value={customValue}
              onChange={(e) => onCustomChange(e.target.value)}
              placeholder="Précisez..."
              className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
              style={{ borderColor: error ? "red" : colors.primary.main }}
            />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      ) : (
        <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-70">
          {value === "Autre" ? customValue : value}
        </p>
      )}
    </div>
  );

  return (
    <div 
      className="min-h-screen flex flex-col p-4 pb-20" 
      style={{ 
        backgroundColor: colors.background.page,
        backgroundImage: `linear-gradient(to bottom right, ${colors.primary.light}20, ${colors.primary.light}05)`
      }}
    >
      <div className="w-full max-w-md mx-auto space-y-8">
        <button
          onClick={() => router.push('/profile')}
          className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-transform duration-300 hover:scale-110"
          style={{ backgroundColor: colors.primary.main }}
        >
          <FiArrowLeft size={20} />
        </button>

        <Title texteNormal="Mes" texteGras="Informations" />
        
        <div 
          className="rounded-lg p-6 shadow-lg space-y-6 relative"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary.main}05, ${colors.primary.light}15)`,
            backdropFilter: 'blur(10px)',
          }}
        >
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300"
              style={{ color: colors.primary.main }}
            >
              <FiEdit2 size={20} />
            </button>
          )}

          <div className="space-y-6">
            <FormField
              label="Prénom"
              value={tempData.firstName}
              error={errors.firstName}
              onChange={(value) => handleChange("firstName", value)}
            />

            <FormField
              label="Nom"
              value={tempData.lastName}
              error={errors.lastName}
              onChange={(value) => handleChange("lastName", value)}
            />

            <FormField
              label="Email"
              value={tempData.email}
              error={errors.email}
              type="email"
              onChange={(value) => handleChange("email", value)}
            />

            <FormField
              label="Téléphone"
              value={tempData.phone}
              error={errors.phone}
              type="tel"
              onChange={(value) => handleChange("phone", value)}
            />

            <div className="space-y-4">
              <h3 className="text-gray-600 font-medium">Formation</h3>
              <div className="space-y-4">
                <FormField
                  label="Type"
                  value={tempData.education.type}
                  options={educationTypes}
                  onChange={(value) => handleEducationChange("type", value)}
                  showCustomField={true}
                  customValue={tempData.customEducation}
                  onCustomChange={(value) => handleChange("customEducation", value)}
                  error={errors.customEducation}
                />

                <FormField
                  label="Année"
                  value={tempData.education.year}
                  options={years}
                  onChange={(value) => handleEducationChange("year", value)}
                />

                <FormField
                  label="Spécialité"
                  value={tempData.education.specialty}
                  options={specialties}
                  onChange={(value) => handleEducationChange("specialty", value)}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200 border-opacity-50">
              <button
                onClick={handleCancel}
                className="flex items-center px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-all duration-300"
              >
                <FiX className="mr-2" /> Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 rounded-md text-white transition-all duration-300"
                style={{ backgroundColor: colors.primary.main }}
              >
                <FiCheck className="mr-2" /> Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}