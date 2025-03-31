import React, { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiEdit2, FiCheck, FiX, FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  seats: number;
  licensePlate?: string;
  comfort: {
    airConditioning: boolean;
    legRoom: boolean;
    music: boolean;
  };
}

export default function VehicleInfo() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "Ma voiture principale",
      type: "Électrique",
      seats: 4,
      licensePlate: "XX-123-YY",
      comfort: {
        airConditioning: true,
        legRoom: true,
        music: false,
      },
    },
  ]);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(vehicles[0]);
  const [showAddForm, setShowAddForm] = useState(false);

  const vehicleTypes = ["Électrique", "Diesel", "Essence", "Hybride"];
  const comfortOptions = [
    { key: "airConditioning", label: "Climatisation" },
    { key: "legRoom", label: "Espace pour les jambes" },
    { key: "music", label: "Musique" },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentVehicle) {
      setVehicles(prev => prev.map(v => v.id === currentVehicle.id ? currentVehicle : v));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (showAddForm) {
      setShowAddForm(false);
    } else {
      setCurrentVehicle(vehicles.find(v => v.id === currentVehicle?.id) || null);
      setIsEditing(false);
    }
  };

  const handleAddVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name: "Nouveau véhicule",
      type: "Électrique",
      seats: 4,
      comfort: {
        airConditioning: false,
        legRoom: false,
        music: false,
      },
    };
    setVehicles(prev => [...prev, newVehicle]);
    setCurrentVehicle(newVehicle);
    setShowAddForm(false);
    setIsEditing(true);
  };

  const handleDeleteVehicle = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      setVehicles(prev => prev.filter(v => v.id !== id));
      if (currentVehicle?.id === id) {
        const remainingVehicles = vehicles.filter(v => v.id !== id);
        setCurrentVehicle(remainingVehicles[0] || null);
      }
    }
  };

  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <div 
      className={`p-4 rounded-lg transition-all duration-300 cursor-pointer ${
        currentVehicle?.id === vehicle.id 
          ? 'bg-white shadow-lg' 
          : 'bg-white bg-opacity-50 hover:bg-opacity-70'
      }`}
      onClick={() => {
        setCurrentVehicle(vehicle);
        setIsEditing(false);
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{vehicle.name}</h3>
          <p className="text-sm text-gray-600">{vehicle.type} - {vehicle.seats} places</p>
          {vehicle.licensePlate && (
            <p className="text-xs text-gray-500 mt-1">{vehicle.licensePlate}</p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteVehicle(vehicle.id);
          }}
          className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
        >
          <FiTrash2 />
        </button>
      </div>
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

        <Title texteNormal="Mes" texteGras="Véhicules" />
        
        <div className="space-y-6">
          {/* Vehicle List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Liste des véhicules</h2>
              <button
                onClick={handleAddVehicle}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: colors.primary.main }}
              >
                <FiPlus /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>

          {/* Vehicle Details */}
          {currentVehicle && (
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-600 font-medium">Nom du véhicule</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentVehicle.name}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, name: e.target.value })}
                      className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{ borderColor: colors.primary.main }}
                      placeholder="Ex: Ma voiture principale"
                    />
                  ) : (
                    <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-70">{currentVehicle.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-600 font-medium">Type de véhicule</label>
                  {isEditing ? (
                    <select
                      value={currentVehicle.type}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, type: e.target.value })}
                      className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{ borderColor: colors.primary.main }}
                    >
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-70">{currentVehicle.type}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-600 font-medium">Nombre de places</label>
                  {isEditing ? (
                    <input
                      type="number"
                      min="1"
                      max="9"
                      value={currentVehicle.seats}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, seats: parseInt(e.target.value) })}
                      className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{ borderColor: colors.primary.main }}
                    />
                  ) : (
                    <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-70">{currentVehicle.seats}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-600 font-medium">Plaque d'immatriculation (optionnel)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentVehicle.licensePlate || ''}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, licensePlate: e.target.value })}
                      className="w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{ borderColor: colors.primary.main }}
                      placeholder="XX-123-YY"
                    />
                  ) : (
                    <p className="text-gray-800 p-2 rounded-md bg-white bg-opacity-70">
                      {currentVehicle.licensePlate || 'Non renseigné'}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-gray-600 font-medium">Préférences de confort</label>
                  <div className="grid grid-cols-1 gap-3">
                    {comfortOptions.map((option) => (
                      <div 
                        key={option.key} 
                        className="flex items-center p-3 rounded-md bg-white bg-opacity-70 hover:bg-opacity-90 transition-all duration-300"
                      >
                        <input
                          type="checkbox"
                          id={option.key}
                          checked={currentVehicle.comfort[option.key as keyof typeof currentVehicle.comfort]}
                          onChange={() => {
                            if (isEditing) {
                              setCurrentVehicle({
                                ...currentVehicle,
                                comfort: {
                                  ...currentVehicle.comfort,
                                  [option.key]: !currentVehicle.comfort[option.key as keyof typeof currentVehicle.comfort],
                                },
                              });
                            }
                          }}
                          disabled={!isEditing}
                          className="w-4 h-4 rounded focus:ring-2 transition-colors duration-300"
                          style={{ 
                            borderColor: colors.primary.main,
                            backgroundColor: currentVehicle.comfort[option.key as keyof typeof currentVehicle.comfort] 
                              ? colors.primary.main 
                              : 'white'
                          }}
                        />
                        <label htmlFor={option.key} className="ml-2 text-gray-800">
                          {option.label}
                        </label>
                      </div>
                    ))}
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
          )}
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}