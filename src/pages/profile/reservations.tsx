import React from "react";
import { Header } from "../../components/global/Header";
import { Division } from "../../components/global/Division";
import { colors } from "../../styles/colors";
import { SettingsItem } from "../../components/global/SettingsItem";
import { FaUser, FaMapMarkerAlt, FaClock, FaExclamationCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Reservations() {
  const reservations = [
    {
      date: "mardi 1 avril",
      time: "08:30",
      driver: "Marie L.",
      meetingPoint: "Parking CESI",
      status: {
        icon: FaCheckCircle,
        text: "Confirmé",
        color: colors.state.success
      }
    },
    {
      date: "mercredi 2 avril",
      time: "17:45",
      driver: "Thomas R.",
      meetingPoint: "Gare centrale",
      status: {
        icon: FaExclamationCircle,
        text: "En attente",
        color: colors.primary.light
      },
    },
    {
      date: "jeudi 3 avril",
      time: "09:00",
      driver: "Sophie M.",
      meetingPoint: "Place de la République",
      status: {
        icon: FaTimesCircle,
        text: "Annulé",
        color: colors.state.error
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes" 
          texteGras="réservations" 
        />

        <Division>
          <div className="space-y-8">
            {reservations.map((reservation, index) => (
              <div key={index} className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 style={{ color: colors.text.label }} className="text-lg font-medium">
                      {reservation.date}
                    </h3>
                    <div className="flex items-center" style={{ color: colors.text.white }}>
                      <FaClock className="mr-2" />
                      <span>{reservation.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2" style={{ color: reservation.status.color }}>
                    <reservation.status.icon />
                    <span>{reservation.status.text}</span>
                  </div>
                </div>

                <SettingsItem
                  icon={FaUser}
                  label="Conducteur"
                  description={reservation.driver}
                  className="bg-opacity-20 hover:bg-opacity-30 transition-all"
                  style={{ backgroundColor: colors.primary.main }}
                />

                <SettingsItem
                  icon={FaMapMarkerAlt}
                  label="Point de rendez-vous"
                  description={reservation.meetingPoint}
                  className="bg-opacity-20 hover:bg-opacity-30 transition-all"
                  style={{ backgroundColor: colors.primary.main }}
                /> 
              </div>
            ))}
          </div>
        </Division>
      </div>
    </div>
  );
}