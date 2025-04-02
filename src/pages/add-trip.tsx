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

export default function AddTrip() {
  const router = useRouter();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    price: parseFloat(price)
  };

  const { errors, validateForm } = useTripFormValidation(formData);

  const handleSubmit = async () => {
    setShowError(false);
    if (validateForm()) {
      try {
        const tripData: Omit<Trip, 'id' | 'userId'> = {
          departure,
          arrival,
          date,
          time,
          availableSeats: parseInt(remainingSeats),
          price: parseFloat(price),
          vehicle: vehicleType
        };

        await tripService.createTrip(tripData);
        router.push('/trips'); // Redirection vers la liste des trajets
      } catch (error) {
        setShowError(true);
        setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
      }
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
          />
          <TextInput
            label="Lieu d'arrivée"
            value={arrival}
            onChange={setArrival}
            placeholder="Entrez le lieu d'arrivée"
            error={errors.arrival}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Date"
              type="date"
              value={date}
              onChange={setDate}
              error={errors.date}
            />
            <TextInput
              label="Heure"
              type="time"
              value={time}
              onChange={setTime}
              error={errors.time}
            />
          </div>

          <TextInput
            label="Prix"
            type="number"
            value={price}
            onChange={setPrice}
            placeholder="Entrez le prix du trajet"
            error={errors.price}
          />

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
              disabled={Object.keys(errors).length > 0}
            />
          </div>
        </div>
      </div>
      <NavBar activePage="home" />
    </div>
  );
}