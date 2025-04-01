import React, { useState } from "react";
import { NavBar } from "@/components/global/NavBar";
import { Header } from "@/components/global/Header";
import { FormInput } from "@/components/global/FormInput";
import { Button } from "@/components/global/Button";
import { VehicleSection } from "@/components/trip/VehicleSection";
import { useVehicles } from "@/hooks/useVehicles";
import { useTripFormValidation } from "@/hooks/useTripFormValidation";
import { colors } from "@/styles/colors";
import { TripFormData } from "@/types/trip";

export default function AddTrip() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const {
    vehicles,
    selectedVehicle,
    remainingSeats,
    vehicleType,
    setRemainingSeats,
    setVehicleType,
    handleVehicleChange
  } = useVehicles();

  const formData: TripFormData = {
    departure,
    arrival,
    date,
    time,
    selectedVehicle,
    remainingSeats,
    vehicleType
  };

  const { errors, validateForm } = useTripFormValidation(formData);

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Implémenter la logique d'envoi du formulaire
      console.log(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header texteNormal="Proposer un" texteGras="trajet" />
        <div className="space-y-4">
          <FormInput
            label="Lieu de départ"
            value={departure}
            onChange={setDeparture}
            placeholder="Entrez le lieu de départ"
            error={errors.departure}
          />
          <FormInput
            label="Lieu d'arrivée"
            value={arrival}
            onChange={setArrival}
            placeholder="Entrez le lieu d'arrivée"
            error={errors.arrival}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Date"
              type="date"
              value={date}
              onChange={setDate}
              error={errors.date}
            />
            <FormInput
              label="Heure"
              type="time"
              value={time}
              onChange={setTime}
              error={errors.time}
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