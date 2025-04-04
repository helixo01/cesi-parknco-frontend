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
import { openRouteService } from "@/services/openRouteService";
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
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [departureSuggestions, setDepartureSuggestions] = useState<string[]>([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState<string[]>([]);
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
  const [selectedArrival, setSelectedArrival] = useState<string | null>(null);
  const [routeCalculationTimeout, setRouteCalculationTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const calculateRoute = async () => {
    try {
      console.log('Calculating route between:', departure, 'and', arrival);
      
      // Vérifier que les deux villes sont sélectionnées
      if (!departure || !arrival) {
        console.log('Missing addresses');
        setRouteInfo(null);
        return null;
      }

      const info = await openRouteService.calculateRoute(departure, arrival);
      console.log('Route info:', info);
      
      if (!info) {
        console.log('No route info returned');
        setRouteInfo(null);
        setErrorMessage('Impossible de calculer le trajet');
        setShowError(true);
        return null;
      }

      setRouteInfo(info);
      setErrorMessage('');
      setShowError(false);
      return info;
    } catch (error) {
      console.error('Error calculating route:', error);
      setRouteInfo(null);
      setErrorMessage(error instanceof Error ? error.message : 'Impossible de calculer le trajet');
      setShowError(true);
      return null;
    }
  };

  const handleDepartureChange = (value: string) => {
    setDeparture(value);
    setErrorMessage('');
    setSelectedDeparture(null);
    
    // Annuler le timeout précédent s'il existe
    if (routeCalculationTimeout) {
      clearTimeout(routeCalculationTimeout);
    }

    // Rechercher les suggestions d'adresses
    if (value.length >= 2) {
      openRouteService.getSuggestions(value, 'departure').then(suggestions => {
        setDepartureSuggestions(suggestions);
      });
    } else {
      setDepartureSuggestions([]);
    }
  };

  const handleArrivalChange = (value: string) => {
    setArrival(value);
    setErrorMessage('');
    setSelectedArrival(null);
    
    // Annuler le timeout précédent s'il existe
    if (routeCalculationTimeout) {
      clearTimeout(routeCalculationTimeout);
    }

    // Rechercher les suggestions d'adresses
    if (value.length >= 2) {
      openRouteService.getSuggestions(value, 'arrival').then(suggestions => {
        setArrivalSuggestions(suggestions);
      });
    } else {
      setArrivalSuggestions([]);
    }
  };

  const handleSelectAddress = (address: string, type: 'departure' | 'arrival') => {
    if (type === 'departure') {
      setDeparture(address);
      setSelectedDeparture(address);
      setDepartureSuggestions([]);
      
      // Si l'arrivée est déjà sélectionnée, calculer le trajet
      if (selectedArrival && address !== '') {
        // Calculer immédiatement avec un délai pour la stabilité
        setTimeout(() => {
          calculateRoute();
        }, 100);
      }
    } else {
      setArrival(address);
      setSelectedArrival(address);
      setArrivalSuggestions([]);
      
      // Si le départ est déjà sélectionné, calculer le trajet
      if (selectedDeparture && address !== '') {
        // Calculer immédiatement avec un délai pour la stabilité
        setTimeout(() => {
          calculateRoute();
        }, 100);
      }
    }
  };

  const calculateArrivalTime = (departureTime: string, duration: string): string => {
    try {
      // Convertir l'heure de départ en Date
      const [hours, minutes] = departureTime.split(':').map(Number);
      const departureDate = new Date();
      departureDate.setHours(hours, minutes, 0, 0);

      // Extraire les minutes de la durée (ex: "45 min")
      const durationMinutes = parseInt(duration.split(' ')[0]);
      
      // Ajouter la durée à l'heure de départ
      departureDate.setMinutes(departureDate.getMinutes() + durationMinutes);

      // Formater l'heure d'arrivée
      const arrivalHours = departureDate.getHours().toString().padStart(2, '0');
      const arrivalMinutes = departureDate.getMinutes().toString().padStart(2, '0');
      
      return `${arrivalHours}:${arrivalMinutes}`;
    } catch (error) {
      console.error('Error calculating arrival time:', error);
      return '--:--';
    }
  };

  const handleSubmit = () => {
    setShowError(false);
    setErrors({});
    
    // Afficher directement la popup de confirmation
    setIsPopupOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      // Vérifier que le trajet est calculé
      if (!routeInfo) {
        throw new Error('Impossible de calculer le trajet');
      }

      const tripData: Omit<Trip, 'id' | 'userId'> = {
        departure: selectedDeparture || departure,
        arrival: selectedArrival || arrival,
        date,
        time,
        availableSeats: parseInt(remainingSeats),
        vehicle: vehicleType,
        distance: routeInfo!.distance,
        duration: routeInfo!.duration,
        arrivalTime: calculateArrivalTime(time, routeInfo!.duration)  // Calculer l'heure d'arrivée
      };

      await tripService.createTrip(tripData);
      setIsPopupOpen(false);
      router.push('/trips');
    } catch (error) {
      console.error('Error creating trip:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erreur lors de la création du trajet');
      setShowError(true);
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
            onChange={handleDepartureChange}
            error={errors.departure}
            required={true}
          />
          {departureSuggestions.length > 0 && (
            <ul className="mt-2 space-y-1 bg-gray-50 rounded-lg">
              {departureSuggestions.map(suggestion => (
                <li 
                  key={suggestion} 
                  onClick={() => handleSelectAddress(suggestion, 'departure')}
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-800 cursor-pointer rounded"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          <TextInput
            label="Lieu d'arrivée"
            value={arrival}
            onChange={handleArrivalChange}
            error={errors.arrival}
            required={true}
          />
          {arrivalSuggestions.length > 0 && (
            <ul className="mt-2 space-y-1 bg-gray-50 rounded-lg">
              {arrivalSuggestions.map(suggestion => (
                <li 
                  key={suggestion} 
                  onClick={() => handleSelectAddress(suggestion, 'arrival')}
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-800 cursor-pointer rounded"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          {/* Affichage des informations de trajet */}
          {routeInfo && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Distance: {routeInfo.distance}
              </p>
              <p className="text-sm text-blue-800">
                Durée: {routeInfo.duration}
              </p>
            </div>
          )}

          {/* Affichage des erreurs */}
          {showError && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}

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

          <div className="pt-4">
            <Button
              text="Valider"
              onClick={handleSubmit}
              disabled={!selectedDeparture || !selectedArrival}
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