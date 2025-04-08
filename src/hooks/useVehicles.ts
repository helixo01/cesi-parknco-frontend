import { useState, useEffect } from "react";
import { VehicleType } from "@/types/trip";
import { vehicleService, Vehicle as DbVehicle } from "@/services/vehicleService";
import { toast } from "react-hot-toast";

// Modification de l'interface Vehicle pour coller à celle du type Trip
interface Vehicle {
  id: string;
  label: string;
  type: VehicleType;
  available: boolean;
  remainingSeats: number;
}

export const useVehicles = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [remainingSeats, setRemainingSeats] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType>("electrique");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const userVehicles = await vehicleService.getUserVehicles();
        
        // Mapper les véhicules de la BDD au format attendu par l'interface
        const mappedVehicles: Vehicle[] = userVehicles.map(v => ({
          id: v._id,
          label: v.name,
          type: mapVehicleType(v.type),
          available: true,
          remainingSeats: v.seats
        }));
        
        setVehicles(mappedVehicles);
      } catch (error) {
        console.error("Erreur lors de la récupération des véhicules:", error);
        toast.error("Impossible de récupérer vos véhicules");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Fonction pour mapper les types de véhicules de la BDD au format attendu par l'interface
  const mapVehicleType = (dbType: string): VehicleType => {
    switch (dbType) {
      case "électrique":
        return "electrique";
      case "diesel":
      case "essence":
        return "thermique";
      case "hybride":
        return "hybride";
      default:
        return "thermique";
    }
  };

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
    loading,
    setRemainingSeats,
    setVehicleType,
    handleVehicleChange
  };
}; 