import { useState } from "react";
import { Vehicle, VehicleType } from "@/types/trip";

export const useVehicles = () => {
  // Simulation de véhicules disponibles
  const vehicles: Vehicle[] = [
    { id: "1", label: "Alpine A290", type: "electrique", available: true, remainingSeats: 4 }
  ];

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [remainingSeats, setRemainingSeats] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType>("electrique");

  const handleVehicleChange = (value: string) => {
    const vehicle = vehicles.find(v => v.id === value);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setRemainingSeats(vehicle.remainingSeats?.toString() || "");
      setVehicleType(vehicle.type);
    } else {
      setSelectedVehicle(null);
      setRemainingSeats("");
      setVehicleType("electrique");
    }
  };

  return {
    vehicles,
    selectedVehicle,
    remainingSeats,
    vehicleType,
    setRemainingSeats,
    setVehicleType,
    handleVehicleChange
  };
}; 