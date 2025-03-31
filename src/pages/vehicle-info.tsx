import React, { useState } from "react";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiEdit2, FiCheck, FiX, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/router";

interface VehicleInfoField {
  label: string;
  value: string;
  type: string;
}

export default function VehicleInfo() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: "Électrique",
    seats: "4",
    licensePlate: "XX-123-YY",
    comfort: {
      airConditioning: true,
      legRoom: true,
      music: false,
    },
  });
  const [tempData, setTempData] = useState({ ...formData });

  const handleEdit = () => {
    setTempData({ ...formData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setFormData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...formData });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setTempData({ ...tempData, [field]: value });
  };

  const handleComfortChange = (comfort: string) => {
    setTempData({
      ...tempData,
      comfort: {
        ...tempData.comfort,
        [comfort]: !tempData.comfort[comfort as keyof typeof tempData.comfort],
      },
    });
  };

  const fields: VehicleInfoField[] = [
    { label: "Type de véhicule", value: tempData.vehicleType, type: "select" },
    { label: "Nombre de places", value: tempData.seats, type: "number" },
    { label: "Plaque d'immatriculation (optionnel)", value: tempData.licensePlate, type: "text" },
  ];

  const vehicleTypes = ["Électrique", "Diesel", "Essence", "Hybride"];
  const comfortOptions = [
    { key: "airConditioning", label: "Climatisation" },
    { key: "legRoom", label: "Espace pour les jambes" },
    { key: "music", label: "Musique" },
  ];

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

        <Title texteNormal="Mon" texteGras="Véhicule" />
        
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
          
          {fields.map((field, index) => (
            <div key={index} className="space-y-2">
              <label className="text-gray-600 font-medium">{field.label}</label>
              {isEditing ? (
                field.type === "select" ? (
                  <select
                    value={field.value}
                    onChange={(e) => handleChange("vehicleType", e.target.value)}
                    className="w-full p-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: colors.primary.main,
                      color: colors.primary.main
                    }}
                  >
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleChange(Object.keys(tempData)[index], e.target.value)}
                    className="w-full p-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: colors.primary.main,
                      color: colors.primary.main
                    }}
                    min={field.type === "number" ? "1" : undefined}
                    max={field.type === "number" ? "8" : undefined}
                  />
                )
              ) : (
                <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-50">{field.value}</p>
              )}
            </div>
          ))}

          <div className="space-y-3">
            <label className="text-gray-600 font-medium">Préférences de confort</label>
            <div className="grid grid-cols-1 gap-3">
              {comfortOptions.map((option) => (
                <div 
                  key={option.key} 
                  className={`flex items-center p-3 rounded-md transition-all duration-300 ${
                    isEditing ? 'hover:bg-white hover:bg-opacity-20' : ''
                  }`}
                  style={{ 
                    backgroundColor: tempData.comfort[option.key as keyof typeof tempData.comfort] 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <input
                    type="checkbox"
                    id={option.key}
                    checked={tempData.comfort[option.key as keyof typeof tempData.comfort]}
                    onChange={() => handleComfortChange(option.key)}
                    disabled={!isEditing}
                    className="w-4 h-4 rounded focus:ring-2 transition-colors duration-300"
                    style={{ 
                      borderColor: colors.primary.main,
                      backgroundColor: tempData.comfort[option.key as keyof typeof tempData.comfort] 
                        ? colors.primary.main 
                        : 'white'
                    }}
                  />
                  <label htmlFor={option.key} className="ml-2 text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
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
      <NavBar />
    </div>
  );
}
