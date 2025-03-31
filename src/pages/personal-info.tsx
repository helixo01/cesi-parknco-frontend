import React, { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiEdit2, FiCheck, FiX, FiUpload, FiArrowLeft } from "react-icons/fi";

export default function PersonalInfo() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    promotion: "4ème année",
    phone: "+33 6 12 34 56 78",
    profilePicture: "",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

        <Title texteNormal="Informations" texteGras="Personnelles" />
        
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
          
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div 
                className="w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center"
                style={{ 
                  borderColor: colors.primary.main,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {formData.profilePicture ? (
                  <img 
                    src={formData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="text-4xl font-semibold"
                    style={{ color: colors.primary.main }}
                  >
                    {formData.firstName[0]}{formData.lastName[0]}
                  </div>
                )}
              </div>
              {isEditing && (
                <label 
                  htmlFor="profile-picture"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-full cursor-pointer"
                >
                  <FiUpload className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleInputChange("profilePicture", reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Nom</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: colors.primary.main,
                    color: colors.text.primary
                  }}
                />
              ) : (
                <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-50">{formData.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Prénom</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: colors.primary.main,
                    color: colors.text.primary
                  }}
                />
              ) : (
                <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-50">{formData.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: colors.primary.main,
                    color: colors.text.primary
                  }}
                />
              ) : (
                <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-50">{formData.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Promotion/Service</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.promotion}
                  onChange={(e) => handleInputChange("promotion", e.target.value)}
                  className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: colors.primary.main,
                    color: colors.text.primary
                  }}
                />
              ) : (
                <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-50">{formData.promotion}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Téléphone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: colors.primary.main,
                    color: colors.text.primary
                  }}
                />
              ) : (
                <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-50">{formData.phone}</p>
              )}
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
