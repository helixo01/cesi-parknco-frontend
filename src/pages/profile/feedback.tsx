import React, { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiStar, FiFlag, FiMessageCircle, FiUser, FiArrowLeft, FiMessageSquare, FiList } from "react-icons/fi";

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  type: "given" | "received";
}

export default function FeedbackInfo() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"received" | "given">("received");

  const reviews: Review[] = [
    {
      id: "1",
      name: "Marie L.",
      date: "2025-03-30",
      rating: 5,
      comment: "Excellent conducteur, très ponctuel et agréable",
      type: "received",
    },
    {
      id: "2",
      name: "Thomas R.",
      date: "2025-03-28",
      rating: 4,
      comment: "Bon trajet, conducteur sympathique",
      type: "received",
    },
    {
      id: "3",
      name: "Sophie M.",
      date: "2025-03-25",
      rating: 3,
      comment: "Trajet correct mais un peu de retard",
      type: "given",
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={index < rating ? "fill-current" : ""}
        style={{ color: index < rating ? colors.primary.main : "#D1D5DB" }}
      />
    ));
  };

  const filteredReviews = reviews.filter((review) => review.type === activeTab);

  return (
    <div 
      className="min-h-screen flex flex-col p-4 pb-20" 
      style={{ 
        backgroundColor: colors.background.page,
        backgroundImage: `linear-gradient(to bottom right, ${colors.primary.light}20, ${colors.primary.light}05)`
      }}
    >
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/profile')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft size={24} color={colors.primary.main} />
          </button>
          <Title texteNormal="Feedback et" texteGras="Avis" />
          <div className="w-10" /> {/* Espaceur pour maintenir l'alignement */}
        </div>

        <div 
          className="rounded-lg shadow-lg overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary.main}05, ${colors.primary.light}15)`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex">
            {[
              { key: "received", label: "Avis reçus", icon: <FiMessageCircle /> },
              { key: "given", label: "Avis donnés", icon: <FiUser /> },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`flex-1 py-4 px-4 text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === tab.key
                    ? `text-white`
                    : "text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-10"
                }`}
                style={activeTab === tab.key ? { backgroundColor: colors.primary.main } : {}}
                onClick={() => setActiveTab(tab.key as "received" | "given")}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="divide-y divide-gray-200 divide-opacity-50">
            {filteredReviews.map((review) => (
              <div 
                key={review.id} 
                className="p-6 space-y-4 transition-all duration-300 hover:bg-white hover:bg-opacity-10"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FiUser className="text-gray-400" />
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-1">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-600 bg-white bg-opacity-50 p-3 rounded-lg">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="w-full py-4 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.light})`,
          }}
        >
          <FiFlag /> Signaler un problème
        </button>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}