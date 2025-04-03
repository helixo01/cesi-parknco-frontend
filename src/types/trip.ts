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
  selectedVehicle?: string;
  remainingSeats: string;
  vehicleType: string;
}

export interface TripFormErrors {
  departure?: string;
  arrival?: string;
  date?: string;
  time?: string;
  selectedVehicle?: string;
  remainingSeats?: string;
  vehicleType?: string;
}

export interface Trip {
  id?: string;
  userId?: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  availableSeats: number;
  vehicle?: string;
  distance: string;  
  duration: string;  
  arrivalTime: string;
  status?: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt?: string;
}