import React, { useState } from "react";
import { Header } from "@/components/global/Header";
import { Division } from "@/components/global/Division";
import { Button } from "@/components/global/Button";
import { FaStar, FaUser, FaComments, FaFlag } from "react-icons/fa";
import { colors } from "@/styles/colors";

type TabType = "received" | "given";

export default function Feedback() {
  const [activeTab, setActiveTab] = useState<TabType>("received");

  const receivedFeedbacks = [
    {
      user: "Marie L.",
      date: "30 mars 2025",
      rating: 5,
      comment: "Excellent conducteur, très ponctuel et agréable"
    },
    {
      user: "Thomas R.",
      date: "28 mars 2025",
      rating: 4,
      comment: "Bon trajet, conducteur sympathique"
    },
    {
      user: "Sophie M.",
      date: "25 mars 2025",
      rating: 5,
      comment: "Super trajet, discussion très intéressante"
    }
  ];

  const givenFeedbacks = [
    {
      user: "Lucas D.",
      date: "1 avril 2025",
      rating: 3,
      comment: "Trajet correct mais un peu de retard au départ"
    },
    {
      user: "Emma B.",
      date: "29 mars 2025",
      rating: 5,
      comment: "Conductrice très sympathique, voiture très propre"
    }
  ];

  const currentFeedbacks = activeTab === "received" ? receivedFeedbacks : givenFeedbacks;

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes" 
          texteGras="Avis" 
        />

        <div className="grid grid-cols-2">
          <button
            className={`flex items-center justify-center space-x-2 p-4 ${
              activeTab === "received" 
                ? "bg-primary-600" 
                : "bg-transparent"
            }`}
            style={{ 
              backgroundColor: activeTab === "received" ? colors.primary.main : "transparent",
              borderBottom: activeTab === "received" ? `2px solid ${colors.text.label}` : "none"
            }}
            onClick={() => setActiveTab("received")}
          >
            <FaComments className="w-5 h-5" style={{ color: activeTab === "received" ? colors.text.white : colors.text.placeholder }} />
            <span style={{ color: activeTab === "received" ? colors.text.white : colors.text.placeholder }}>
              Avis reçus
            </span>
          </button>
          <button
            className={`flex items-center justify-center space-x-2 p-4`}
            style={{ 
              backgroundColor: activeTab === "given" ? colors.primary.main : "transparent",
              borderBottom: activeTab === "given" ? `2px solid ${colors.text.label}` : "none"
            }}
            onClick={() => setActiveTab("given")}
          >
            <FaUser className="w-5 h-5" style={{ color: activeTab === "given" ? colors.text.white : colors.text.placeholder }} />
            <span style={{ color: activeTab === "given" ? colors.text.white : colors.text.placeholder }}>
              Avis donnés
            </span>
          </button>
        </div>

        <div className="space-y-8">
          {currentFeedbacks.map((feedback, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaUser className="w-5 h-5" style={{ color: colors.text.label }} />
                <span style={{ color: colors.text.label }}>{feedback.user}</span>
                <span style={{ color: colors.text.placeholder }} className="text-sm">
                  {feedback.date}
                </span>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="w-5 h-5"
                    style={{ 
                      color: i < feedback.rating ? colors.primary.light : colors.text.placeholder 
                    }}
                  />
                ))}
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: colors.background.navbar,
                  color: colors.text.placeholder 
                }}
              >
                {feedback.comment}
              </div>
              {index < currentFeedbacks.length - 1 && (
                <div className="border-b border-gray-700" />
              )}
            </div>
          ))}
        </div>

        <button
          className="w-full p-4 rounded-lg flex items-center justify-center space-x-2"
          style={{ backgroundColor: colors.primary.main }}
        >
          <FaFlag className="w-5 h-5" style={{ color: colors.text.white }} />
          <span style={{ color: colors.text.white }}>Signaler un problème</span>
        </button>
      </div>
    </div>
  );
}
