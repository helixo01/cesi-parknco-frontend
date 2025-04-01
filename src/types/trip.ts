export type VehicleType = "thermique" | "hybride" | "electrique";

export interface Vehicle {
  id: string;
  label: string;
  type: VehicleType;
  available: boolean;
  remainingSeats?: number;
}

export interface TripFormData {
  departure: string;
  arrival: string;
  date: string;
  time: string;
  selectedVehicle: Vehicle | null;
  remainingSeats: string;
  vehicleType: VehicleType;
}

export interface TripFormErrors {
  departure?: string;
  arrival?: string;
  date?: string;
  time?: string;
  remainingSeats?: string;
} 