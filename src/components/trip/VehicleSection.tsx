import React from "react";
import { TextInput } from "@/components/global/TextInput";
import { NumberInput } from "@/components/global/NumberInput";
import { Vehicle, VehicleType } from "@/types/trip";

interface VehicleSectionProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  remainingSeats: string;
  vehicleType: VehicleType;
  onVehicleChange: (value: string) => void;
  onRemainingSeatsChange: (value: string) => void;
  onVehicleTypeChange: (value: VehicleType) => void;
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
  errors
}) => {
  return (
    <>
      <TextInput
        label="Véhicule"
        type="select"
        value={selectedVehicle?.id || ""}
        onChange={onVehicleChange}
        options={vehicles.map(v => ({
          value: v.id,
          label: v.label
        }))}
        placeholder="Sélectionnez un véhicule"
      />

      <div className="space-y-4">
        <NumberInput
          label="Nombre de places restantes"
          value={remainingSeats}
          onChange={onRemainingSeatsChange}
          placeholder="Nombre de places"
          min={1}
          max={8}
          error={errors.remainingSeats}
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
          disabled={!!selectedVehicle}
        />
      </div>
    </>
  );
}; 