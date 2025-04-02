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
  price: number;
}

export interface TripFormErrors {
  departure?: string;
  arrival?: string;
  date?: string;
  time?: string;
  remainingSeats?: string;
  vehicleType?: string;
  price?: string;
}

export interface Trip {
  id?: string;
  userId?: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  availableSeats: number;
  price: number;
  vehicle?: string;
  status?: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt?: string;
}