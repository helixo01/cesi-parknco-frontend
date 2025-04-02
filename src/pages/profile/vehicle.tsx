import React, { useState } from "react";
import { Header } from "../../components/global/Header";
import { Division } from "../../components/global/Division";
import { colors } from "../../styles/colors";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { FormInput } from "../../components/global/FormInput";
import { Button } from "../../components/global/Button";
import { CheckboxInput } from "../../components/global/CheckboxInput";

interface Vehicle {
  name: string;
  type: string;
  seats: number;
  plate: string;
  comfort: string[];
}

export default function Vehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      name: "Voiture",
      type: "Électrique",
      seats: 4,
      plate: "XX-123-YY",
      comfort: ["Climatisation", "Espace pour les jambes"]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    name: "",
    type: "Électrique",
    seats: 4,
    plate: "",
    comfort: []
  });

  const handleDelete = (index: number) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setNewVehicle(vehicles[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedVehicles = [...vehicles];
      updatedVehicles[editingIndex] = newVehicle;
      setVehicles(updatedVehicles);
      setEditingIndex(null);
    } else {
      setVehicles([...vehicles, newVehicle]);
    }
    setShowForm(false);
    setNewVehicle({
      name: "",
      type: "Électrique",
      seats: 4,
      plate: "",
      comfort: []
    });
  };

  const handleComfortChange = (comfort: string, checked: boolean) => {
    if (checked) {
      setNewVehicle({...newVehicle, comfort: [...newVehicle.comfort, comfort]});
    } else {
      setNewVehicle({...newVehicle, comfort: newVehicle.comfort.filter(c => c !== comfort)});
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Liste des" 
          texteGras="véhicules" 
        />

        <Division>
          <div className="space-y-4">
            {vehicles.map((vehicle, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-white">{vehicle.name}</h3>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                        {vehicle.type}
                      </span>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        {vehicle.seats} places
                      </span>
                    </div>
                    {vehicle.plate && (
                      <span className="block mt-2 bg-gray-600 text-white px-3 py-1 rounded-full text-sm inline-block">
                        {vehicle.plate}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!showForm && (
              <Button
                text="Ajouter un véhicule"
                variant="primary"
                onClick={() => setShowForm(true)}
              />
            )}

            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  label="Nom du véhicule"
                  value={newVehicle.name}
                  onChange={(value) => setNewVehicle({...newVehicle, name: value})}
                  required
                  variant="light"
                />

                <FormInput
                  label="Type de véhicule"
                  type="select"
                  value={newVehicle.type}
                  onChange={(value) => setNewVehicle({...newVehicle, type: value})}
                  required
                  variant="light"
                  options={[
                    { value: "Électrique", label: "Électrique" },
                    { value: "Diesel", label: "Diesel" },
                    { value: "Essence", label: "Essence" },
                    { value: "Hybride", label: "Hybride" }
                  ]}
                />

                <FormInput
                  label="Nombre de places"
                  type="number"
                  value={newVehicle.seats.toString()}
                  onChange={(value) => setNewVehicle({...newVehicle, seats: parseInt(value)})}
                  required
                  min={1}
                  max={9}
                  variant="light"
                />

                <FormInput
                  label="Plaque d'immatriculation (optionnel)"
                  value={newVehicle.plate}
                  onChange={(value) => setNewVehicle({...newVehicle, plate: value})}
                  variant="light"
                />

                <div className="space-y-2">
                  <p className="text-gray-300">Options de confort</p>
                  <CheckboxInput
                    label="Climatisation"
                    checked={newVehicle.comfort.includes("Climatisation")}
                    onChange={(checked) => handleComfortChange("Climatisation", checked)}
                  />
                  <CheckboxInput
                    label="Espace pour les jambes"
                    checked={newVehicle.comfort.includes("Espace pour les jambes")}
                    onChange={(checked) => handleComfortChange("Espace pour les jambes", checked)}
                  />
                </div>

                <div className="flex gap-2">
                <div className="flex-1">
                    <Button
                      text="Annuler"
                      variant="error"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                        setNewVehicle({
                          name: "",
                          type: "Électrique",
                          seats: 4,
                          plate: "",
                          comfort: []
                        });
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex-1"
                  >
                    <Button
                      text={editingIndex !== null ? "Modifier" : "Enregistrer"}
                      variant="primary"
                    />
                  </button>
                  
                </div>
              </form>
            )}
          </div>
        </Division>
      </div>
    </div>
  );
}