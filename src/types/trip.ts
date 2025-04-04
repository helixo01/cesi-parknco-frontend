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

export interface TripRequest {
  _id: string;
  tripId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Driver {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  rating?: number;
}

export interface Trip {
  _id: string;
  userId: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  availableSeats: number;
  vehicle: string;
  distance: string;
  duration: string;
  status: string;
  arrivalTime: string;
  requests: TripRequest[];
  createdAt: string;
  driver?: Driver;
}

export interface TripResponse {
  currentTrips: Trip[];
  pastTrips: Trip[];
}