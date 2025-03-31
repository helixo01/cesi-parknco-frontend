import React, { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiArrowLeft, FiCheck, FiX, FiEdit2, FiUpload } from "react-icons/fi";
import { BiUser } from "react-icons/bi";

export default function PersonalInfo() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@viacesi.fr",
    phone: "06 12 34 56 78",
    education: {
      type: "Personnel",
      year: "",
      specialty: "",
    },
    customEducation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [tempData, setTempData] = useState({ ...formData });

  const educationTypes = ["Personnel", "Master", "CPE", "FISE", "FISA"];
  const specialties = ["informatique", "btp", "généraliste"];
  const years = {
    "Personnel": [],
    "Master": ["1", "2", "3", "4", "5"],
    "CPE": ["1", "2"],
    "FISE": ["3", "4", "5"],
    "FISA": ["3", "4", "5"]
  };

  const canSelectSpecialty = (type: string, year: string) => {
    if (type === "Personnel") return false;
    if (type === "CPE" && year === "1") return false;
    if (["Master", "CPE", "FISE", "FISA"].includes(type) && year !== "1") return true;
    return false;
  };

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
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSave = () => {
    if (validateForm()) {
      setFormData({ ...tempData });
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximum : 5 Mo');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
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

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4 pb-6 border-b border-gray-200">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg border-2 border-white">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <BiUser size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="absolute -bottom-2 -right-2">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="profile-picture-input"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('profile-picture-input') as HTMLInputElement;
                      if (input) input.click();
                    }}
                    className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: colors.primary.main }}
                  >
                    <FiUpload className="text-white" size={18} />
                  </button>
                </div>
              )}
            </div>
            {isEditing && selectedFile && (
              <p className="text-sm text-gray-600">
                Photo sélectionnée : {selectedFile.name}
              </p>
            )}
          </div>

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
              
              <div className="space-y-4">
                <FormField
                  label="Type de formation"
                  value={tempData.education.type}
                  onChange={(value) => {
                    handleEducationChange("type", value);
                    handleEducationChange("year", "");
                    handleEducationChange("specialty", "");
                  }}
                  options={educationTypes}
                />

                {tempData.education.type !== "Personnel" && (
                  <FormField
                    label="Année"
                    value={tempData.education.year}
                    onChange={(value) => {
                      handleEducationChange("year", value);
                      if (!canSelectSpecialty(tempData.education.type, value)) {
                        handleEducationChange("specialty", "");
                      }
                    }}
                    options={years[tempData.education.type as keyof typeof years]}
                  />
                )}

                {canSelectSpecialty(tempData.education.type, tempData.education.year) && (
                  <FormField
                    label="Spécialité"
                    value={tempData.education.specialty}
                    onChange={(value) => handleEducationChange("specialty", value)}
                    options={specialties}
                  />
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
              >
                <FiX size={20} />
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg flex items-center gap-2 text-white transition-colors duration-300"
                style={{ backgroundColor: colors.primary.main }}
              >
                <FiCheck size={20} />
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}