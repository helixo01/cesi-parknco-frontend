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
  isCompleted?: boolean;
  rating?: number;
  ratedAt?: string;
  isPickedUp?: boolean;
  pickedUpAt?: string;
  pickupConfirmedByPassenger?: boolean;
  pickupConfirmedByPassengerAt?: string;
  firstName?: string;
  lastName?: string;
}

export interface Driver {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  rating?: number;
}

export interface TripConfirmation {
  _id: string;
  tripId: string;
  userId: string;
  role: 'driver' | 'passenger';
  isConfirmed: boolean;
  isPickedUp: boolean;
  confirmedAt: string;
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
  status: 'pending' | 'active' | 'in_progress' | 'completed' | 'cancelled';
  arrivalTime: string;
  requests: TripRequest[];
  createdAt: string;
  driver?: Driver;
  isDriverConfirmed?: boolean;
  driverConfirmedAt?: string;
  startedAt?: string;
  completedAt?: string;
  allPassengersPickedUp?: boolean;
  allPassengersConfirmed?: boolean;
  needsRating?: boolean;
  isRated?: boolean;
  rating?: number;
  userRole?: 'driver' | 'passenger';
  confirmations?: TripConfirmation[];
  ratings?: TripRating[];
}

export interface TripResponse {
  currentTrips: Trip[];
  pastTrips: Trip[];
}

export interface TripRating {
  tripId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  role: 'driver' | 'passenger';
  createdAt: string;
}