import React from "react";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { FiClock, FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";
import { AiFillStar, AiOutlineCar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";

interface Trip {
  id: string;
  departure: {
    place: string;
    time: string;
    date?: string;
  };
  arrival: {
    place: string;
    time: string;
  };
  duration: string;
  price?: number;
  seatsAvailable?: number;
  driver: {
    name: string;
    rating: number;
    avatar?: string;
  };
  vehicle?: {
    model: string;
    color: string;
  };
  isHistory?: boolean;
}

export default function Trips() {
  // Mock data - replace with actual API call
  const trips: Trip[] = [
    {
      id: "1",
      departure: {
        place: "CESI Lyon",
        time: "17:28",
        date: "Aujourd'hui"
      },
      arrival: {
        place: "Gare Part-Dieu",
        time: "18:00"
      },
      duration: "32 min",
      price: 2.50,
      seatsAvailable: 3,
      driver: {
        name: "John Doe",
        rating: 5,
        avatar: ""  // Empty string to force default avatar
      },
      vehicle: {
        model: "Peugeot 208",
        color: "Grise"
      }
    },
    {
      id: "2",
      departure: {
        place: "Gare Part-Dieu",
        time: "08:30",
        date: "30 mars"
      },
      arrival: {
        place: "CESI Lyon",
        time: "09:00"
      },
      duration: "30 min",
      price: 2.50,
      driver: {
        name: "Jane Smith",
        rating: 4,
        avatar: ""
      },
      vehicle: {
        model: "Renault Clio",
        color: "Bleue"
      },
      isHistory: true
    }
  ];

  const renderTripCard = (trip: Trip) => (
    <Card key={trip.id} className="bg-gray-900 text-white p-4 max-w-sm">
      <div className="space-y-4">
        {/* En-tête avec date et durée */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <FiCalendar className="w-4 h-4" />
            <span>{trip.departure.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BiTimeFive className="w-4 h-4" />
            <span>{trip.duration}</span>
          </div>
        </div>

        {/* Trajet */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="w-0.5 h-14 bg-gray-600" />
              <div className="w-3 h-3 rounded-full bg-red-500" />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <div className="font-medium">{trip.departure.time}</div>
                <div className="text-sm text-gray-400">{trip.departure.place}</div>
              </div>
              <div>
                <div className="font-medium">{trip.arrival.time}</div>
                <div className="text-sm text-gray-400">{trip.arrival.place}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="grid grid-cols-2 gap-3 py-2 border-t border-gray-800">
          <div className="flex items-center space-x-2 text-sm">
            <AiOutlineCar className="w-4 h-4 text-gray-400" />
            <span>{trip.vehicle?.model}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <FiUsers className="w-4 h-4 text-gray-400" />
            <span>{trip.seatsAvailable} places</span>
          </div>
        </div>

        {/* Conducteur et prix */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <Avatar
              src={null}  // On force l'utilisation des initiales
              alt={trip.driver.name}
              size="sm"
              className="w-8 h-8"
            />
            <div>
              <div className="text-sm">{trip.driver.name}</div>
              <div className="flex items-center">
                <AiFillStar className="text-yellow-400 w-3 h-3" />
                <span className="text-xs ml-1">{trip.driver.rating}</span>
              </div>
            </div>
          </div>
          {trip.price && (
            <div className="text-lg font-semibold">
              {trip.price.toFixed(2)}€
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  const currentTrips = trips.filter(trip => !trip.isHistory);
  const historyTrips = trips.filter(trip => trip.isHistory);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background.page }}>
      <Title 
        texteNormal="Mes"
        texteGras="trajets"
      />
      
      <div className="flex-1 px-4 pb-20">
        <div className="space-y-4 mt-4">
          {currentTrips.map(renderTripCard)}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Historique des trajets</h2>
          <div className="space-y-4">
            {historyTrips.map(renderTripCard)}
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
}
