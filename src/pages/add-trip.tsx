import React, { useState } from "react";
import { useRouter } from 'next/router';
import { NavBar } from "@/components/global/NavBar";
import { Header } from "@/components/global/Header";
import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";
import { VehicleSection } from "@/components/trip/VehicleSection";
import { useVehicles } from "@/hooks/useVehicles";
import { useTripFormValidation } from "@/hooks/useTripFormValidation";
import { colors } from "@/styles/colors";
import { tripService } from "@/services/tripService";
import { Trip } from "@/types/trip";
import PopUpConfirmation from "@/components/global/PopUpConfirmation";

export default function AddTrip() {
  const router = useRouter();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    vehicles,
    selectedVehicle,
    remainingSeats,
    vehicleType,
    setRemainingSeats,
    setVehicleType,
    handleVehicleChange
  } = useVehicles();

  const formData = {
    departure,
    arrival,
    date,
    time,
    selectedVehicle: selectedVehicle?.id,
    remainingSeats,
    vehicleType,
  };

  const { errors, validateForm, setErrors } = useTripFormValidation(formData);

  const handleSubmit = () => {
    setShowError(false);
    setErrors({});
    
    if (validateForm()) {
      setIsPopupOpen(true);
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      const tripData: Omit<Trip, 'id' | 'userId'> = {
        departure,
        arrival,
        date,
        time,
        availableSeats: parseInt(remainingSeats),
        vehicle: vehicleType
      };

      await tripService.createTrip(tripData);
      router.push('/trips');
    } catch (error) {
      setShowError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsPopupOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header texteNormal="Proposer un" texteGras="trajet" />
        <div className="space-y-4">
          <TextInput
            label="Lieu de départ"
            value={departure}
            onChange={setDeparture}
            placeholder="Entrez le lieu de départ"
            error={errors.departure}
            required={true}
          />
          <TextInput
            label="Lieu d'arrivée"
            value={arrival}
            onChange={setArrival}
            placeholder="Entrez le lieu d'arrivée"
            error={errors.arrival}
            required={true}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Date"
              type="date"
              value={date}
              onChange={setDate}
              error={errors.date}
              required={true}
            />
            <TextInput
              label="Heure"
              type="time"
              value={time}
              onChange={setTime}
              error={errors.time}
              required={true}
            />
          </div>
          
          <VehicleSection
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            remainingSeats={remainingSeats}
            vehicleType={vehicleType}
            onVehicleChange={handleVehicleChange}
            onRemainingSeatsChange={setRemainingSeats}
            onVehicleTypeChange={setVehicleType}
            errors={errors}
          />

          {showError && (
            <div className="text-red-500 text-sm mt-2">
              {errorMessage}
            </div>
          )}

          <div className="pt-4">
            <Button
              text="Valider"
              onClick={handleSubmit}
              disabled={false}
            />
          </div>
        </div>
      </div>
      <NavBar activePage="home" />

      <PopUpConfirmation
        isOpen={isPopupOpen}
        message="Êtes-vous sûr de vouloir créer ce trajet ?"
        onCancel={() => setIsPopupOpen(false)}
        onAccept={handleConfirmSubmit}
      />
    </div>
  );
}