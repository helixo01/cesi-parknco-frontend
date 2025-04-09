import React from "react";
import { TextInput } from "@/components/global/TextInput";
import { NumberInput } from "@/components/global/NumberInput";
import { Vehicle, VehicleType } from "@/types/trip";
import Link from "next/link";
import { AiOutlinePlus, AiOutlineCar } from "react-icons/ai";

interface VehicleSectionProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  remainingSeats: string;
  vehicleType: VehicleType;
  onVehicleChange: (value: string) => void;
  onRemainingSeatsChange: (value: string) => void;
  onVehicleTypeChange: (value: VehicleType) => void;
  loading?: boolean;
  errors: {
    remainingSeats?: string;
  };
}

export const VehicleSection: React.FC<VehicleSectionProps> = ({
  vehicles,
  selectedVehicle,
  remainingSeats,
  vehicleType,
  onVehicleChange,
  onRemainingSeatsChange,
  onVehicleTypeChange,
  loading = false,
  errors
}) => {
  const hasVehicles = vehicles.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-white">Véhicule</label>
        
        {loading ? (
          <div className="p-3 bg-[#1A2D3E] rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            <span className="text-sm text-gray-300">Chargement des véhicules...</span>
          </div>
        ) : !hasVehicles ? (
          <Link href="/profile/vehicle" className="p-3 bg-[#1A2D3E] rounded-lg flex items-center justify-center hover:bg-[#243B50] transition-colors">
            <AiOutlinePlus className="mr-2 text-blue-400" />
            <span className="text-sm text-blue-400">Aucun véhicule disponible. Cliquez pour en ajouter.</span>
          </Link>
        ) : (
          <TextInput
            type="select"
            value={selectedVehicle?.id || ""}
            onChange={onVehicleChange}
            options={vehicles.map(v => ({
              value: v.id,
              label: `${v.label} (${v.type}, ${v.remainingSeats} places)`
            }))}
            placeholder="Sélectionnez un véhicule"
            label=""
          />
        )}
      </div>

      {selectedVehicle ? (
        <div className="space-y-4">
          <div className="p-4 bg-[#1A2D3E] rounded-lg">
            <div className="flex items-center mb-3">
              <AiOutlineCar className="mr-2 text-gray-300" size={20} />
              <h3 className="text-white font-medium">{selectedVehicle.label}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-2">
              <div>
                <span className="text-gray-400">Type :</span>
                <span className="ml-2 text-white capitalize">{selectedVehicle.type === "electrique" ? "Électrique" : selectedVehicle.type === "thermique" ? "Thermique" : "Hybride"}</span>
              </div>
              <div>
                <span className="text-gray-400">Places max :</span>
                <span className="ml-2 text-white">{selectedVehicle.remainingSeats}</span>
              </div>
            </div>
          </div>
          
          <NumberInput
            label="Nombre de places disponibles"
            value={remainingSeats}
            onChange={onRemainingSeatsChange}
            placeholder="Nombre de places"
            min={1}
            max={selectedVehicle.remainingSeats}
            error={errors.remainingSeats}
            required={true}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <NumberInput
            label="Nombre de places restantes"
            value={remainingSeats}
            onChange={onRemainingSeatsChange}
            placeholder="Nombre de places"
            min={1}
            max={4}
            error={errors.remainingSeats}
            required={true}
          />
          <TextInput
            label="Type de véhicule"
            type="select"
            value={vehicleType}
            onChange={(value) => onVehicleTypeChange(value as VehicleType)}
            options={[
              { value: "thermique", label: "Thermique" },
              { value: "hybride", label: "Hybride" },
              { value: "electrique", label: "Électrique" }
            ]}
            required={true}
          />
        </div>
      )}
    </div>
  );
}; 