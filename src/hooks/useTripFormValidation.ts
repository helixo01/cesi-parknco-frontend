import { useState } from "react";
import { TripFormData, TripFormErrors } from "@/types/trip";

export const useTripFormValidation = (formData: TripFormData) => {
  const [errors, setErrors] = useState<TripFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: TripFormErrors = {};

    if (!formData.departure.trim()) {
      newErrors.departure = "Le lieu de départ est requis";
    }

    if (!formData.arrival.trim()) {
      newErrors.arrival = "Le lieu d'arrivée est requis";
    }

    if (!formData.date) {
      newErrors.date = "La date est requise";
    }

    if (!formData.time) {
      newErrors.time = "L'heure est requise";
    }

    if (!formData.remainingSeats) {
      newErrors.remainingSeats = "Le nombre de places est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    validateForm,
    setErrors
  };
}; 