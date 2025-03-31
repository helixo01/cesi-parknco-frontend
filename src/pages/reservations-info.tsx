import React from "react";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiClock, FiCheck, FiX, FiAlertCircle, FiMapPin, FiUser } from "react-icons/fi";

interface Reservation {
  id: string;
  date: string;
  time: string;
  driver: string;
  meetingPoint: string;
  status: "confirmed" | "pending" | "cancelled";
  notifications?: string[];
}

export default function ReservationsInfo() {
  const reservations: Reservation[] = [
    {
      id: "1",
      date: "2025-04-01",
      time: "08:30",
      driver: "Marie L.",
      meetingPoint: "Parking CESI",
      status: "confirmed",
    },
    {
      id: "2",
      date: "2025-04-02",
      time: "17:45",
      driver: "Thomas R.",
      meetingPoint: "Gare centrale",
      status: "pending",
      notifications: ["Le conducteur a modifié l'heure de départ"],
    },
    {
      id: "3",
      date: "2025-04-03",
      time: "09:00",
      driver: "Sophie M.",
      meetingPoint: "Place de la République",
      status: "cancelled",
      notifications: ["Trajet annulé par le conducteur"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          text: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
          gradient: "from-green-50 to-green-100"
        };
      case "pending":
        return {
          text: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          gradient: "from-yellow-50 to-yellow-100"
        };
      case "cancelled":
        return {
          text: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
          gradient: "from-red-50 to-red-100"
        };
      default:
        return {
          text: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
          gradient: "from-gray-50 to-gray-100"
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <FiCheck />;
      case "pending":
        return <FiClock />;
      case "cancelled":
        return <FiX />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmé";
      case "pending":
        return "En attente";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col p-4 pb-20" 
      style={{ 
        backgroundColor: colors.background.page,
        backgroundImage: `linear-gradient(to bottom right, ${colors.primary.light}20, ${colors.primary.light}05)`
      }}
    >
      <div className="w-full max-w-md mx-auto space-y-8">
        <Title texteNormal="Mes" texteGras="Réservations" />
        
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div 
              key={reservation.id} 
              className="rounded-lg p-6 shadow-lg space-y-4 transition-transform duration-300 hover:scale-[1.02]"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary.main}05, ${colors.primary.light}15)`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-lg font-medium" style={{ color: colors.primary.main }}>
                    {new Date(reservation.date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                  <div className="text-gray-600 flex items-center gap-1">
                    <FiClock className="inline" size={14} />
                    {reservation.time}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm ${
                    getStatusColor(reservation.status).text
                  } ${getStatusColor(reservation.status).bg}`}
                >
                  {getStatusIcon(reservation.status)}
                  {getStatusText(reservation.status)}
                </div>
              </div>

              <div className="space-y-2 p-3 rounded-lg bg-white bg-opacity-50">
                <div className="flex items-center gap-2 text-gray-600">
                  <FiUser className="text-gray-400" />
                  <span className="font-medium">Conducteur:</span>
                  {reservation.driver}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiMapPin className="text-gray-400" />
                  <span className="font-medium">Point de rendez-vous:</span>
                  {reservation.meetingPoint}
                </div>
              </div>

              {reservation.notifications && reservation.notifications.length > 0 && (
                <div className={`mt-4 p-3 rounded-lg border ${getStatusColor(reservation.status).border} ${getStatusColor(reservation.status).bg}`}>
                  {reservation.notifications.map((notification, index) => (
                    <div key={index} className={`flex items-start gap-2 ${getStatusColor(reservation.status).text}`}>
                      <FiAlertCircle className="mt-1 flex-shrink-0" />
                      <p>{notification}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
}