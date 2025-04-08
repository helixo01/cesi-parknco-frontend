import React, { useEffect, useState } from "react";
import { NavBar } from "@/components/global/NavBar";
import { Header } from "@/components/global/Header";
import { colors } from "@/styles/colors";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { vehicleService, Vehicle } from "@/services/vehicleService";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineCar } from "react-icons/ai";

export default function VehiclePage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'électrique' as Vehicle['type'],
    seats: 4
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getUserVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Erreur lors du chargement des véhicules:', error);
      toast.error('Erreur lors du chargement des véhicules');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (vehicle?: Vehicle) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData({
        name: vehicle.name,
        type: vehicle.type,
        seats: vehicle.seats
      });
    } else {
      setEditingVehicle(null);
      setFormData({
        name: '',
        type: 'électrique',
        seats: 4
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingVehicle(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'seats') {
      // Limiter le nombre de places à 4 maximum
      const seatsValue = parseInt(value, 10);
      if (seatsValue > 4) {
        return;
      }
      setFormData({
        ...formData,
        [name]: seatsValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingVehicle) {
        // Mise à jour d'un véhicule existant
        await vehicleService.updateVehicle(editingVehicle._id, formData);
        toast.success('Véhicule mis à jour avec succès');
      } else {
        // Création d'un nouveau véhicule
        await vehicleService.createVehicle(formData);
        toast.success('Véhicule ajouté avec succès');
      }
      
      // Recharger la liste des véhicules
      handleCloseModal();
      loadVehicles();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await vehicleService.deleteVehicle(id);
        toast.success('Véhicule supprimé avec succès');
        loadVehicles();
      } catch (error) {
        console.error('Erreur lors de la suppression du véhicule:', error);
        toast.error('Erreur lors de la suppression du véhicule');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mon"
          texteGras="Véhicule"
        />

        {/* Formulaire d'ajout/modification */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nom du véhicule
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#0A1D2E] border border-gray-700 rounded-lg p-3 text-white"
              placeholder="Ex: Ma Clio, Mon SUV..."
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
              Type de véhicule
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full bg-[#0A1D2E] border border-gray-700 rounded-lg p-3 text-white"
            >
              <option value="électrique">Électrique</option>
              <option value="diesel">Diesel</option>
              <option value="essence">Essence</option>
              <option value="hybride">Hybride</option>
            </select>
          </div>

          <div>
            <label htmlFor="seats" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de places
            </label>
            <input
              type="number"
              id="seats"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              required
              min="1"
              max="4"
              className="w-full bg-[#0A1D2E] border border-gray-700 rounded-lg p-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editingVehicle ? 'Modifier le véhicule' : 'Ajouter le véhicule'}
          </button>
        </form>

        {/* Liste des véhicules */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Mes véhicules</h2>
          {vehicles.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Aucun véhicule enregistré</p>
          ) : (
            vehicles.map(vehicle => (
              <div
                key={vehicle._id}
                className="bg-[#1A2D3E] rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-white font-medium">{vehicle.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} - {vehicle.seats} places
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenModal(vehicle)}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
} 