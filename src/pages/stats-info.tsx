import React from "react";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { AiOutlineCar, AiOutlineUser, AiOutlineTrophy, AiFillEnvironment, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/router";
import { FiArrowLeft, FiAward } from "react-icons/fi";

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}

export default function StatsInfo() {
  const router = useRouter();
  const stats: StatCard[] = [
    {
      icon: <AiOutlineCar size={24} />,
      title: "Trajets réalisés",
      value: "42",
    },
    {
      icon: <AiOutlineUser size={24} />,
      title: "Passagers transportés",
      value: "128",
    },
    {
      icon: <AiOutlineCar size={24} />,
      title: "Kilomètres covoiturés",
      value: "1,543",
      subtitle: "kilomètres",
    },
    {
      icon: <AiFillEnvironment size={24} />,
      title: "CO₂ économisé",
      value: "246",
      subtitle: "kg",
    },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col p-4 pb-20" 
      style={{ 
        backgroundColor: colors.background.page,
        backgroundImage: `linear-gradient(to bottom right, ${colors.primary.light}20, ${colors.primary.light}05)`
      }}
    >
      <div className="w-full max-w-md mx-auto space-y-8">
        <button
          onClick={() => router.push('/profile')}
          className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-transform duration-300 hover:scale-110"
          style={{ backgroundColor: colors.primary.main }}
        >
          <FiArrowLeft size={20} />
        </button>

        <Title texteNormal="Mes" texteGras="Statistiques" />
        
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg p-4 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary.main}10, ${colors.primary.light}30)`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rounded-full"
                style={{ background: `${colors.primary.main}20` }}
              />
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${colors.primary.main}20`, color: colors.primary.main }}
              >
                {stat.icon}
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="text-2xl font-bold" style={{ color: colors.primary.main }}>
                {stat.value}
              </p>
              {stat.subtitle && <p className="text-sm text-gray-500">{stat.subtitle}</p>}
            </div>
          ))}
        </div>

        {/* Badges Section */}
        <div 
          className="rounded-lg p-6 shadow-lg space-y-6"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary.main}05, ${colors.primary.light}15)`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.primary.main }}>
              <FiAward /> Badges
            </h3>
            
            {/* Current Badge */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white bg-opacity-70">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-md"
                style={{ 
                  backgroundColor: '#22c55e', 
                  color: 'white',
                }}
              >
                <AiFillEnvironment size={32} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Éco-responsable</h4>
                <p className="text-sm font-medium text-gray-700">10 trajets effectués</p>
              </div>
            </div>

            {/* Next Badge */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Prochain objectif</h4>
              <div className="p-4 rounded-lg bg-white bg-opacity-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'rgba(234, 179, 8, 0.2)', 
                      color: '#ca8a04', 
                    }}
                  >
                    <AiOutlineStar size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Super Covoitureur</h4>
                    <p className="text-sm font-medium text-gray-700">25 trajets effectués</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-yellow-600">42%</p>
                  <p className="text-sm font-medium text-gray-700">17 restants</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="rounded-lg p-6 shadow-lg space-y-6"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary.main}05, ${colors.primary.light}15)`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.primary.main }}>
              <AiOutlineTrophy /> Classement
            </h3>
            <div className="space-y-3">
              {[
                { position: 1, name: "Sarah M.", points: 1250 },
                { position: 2, name: "Marc D.", points: 980 },
                { position: 3, name: "Vous", points: 845, highlight: true },
                { position: 4, name: "Julie L.", points: 820 },
                { position: 5, name: "Thomas R.", points: 790 },
              ].map((user) => (
                <div
                  key={user.position}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                    user.highlight 
                      ? `bg-white bg-opacity-50` 
                      : 'hover:bg-white hover:bg-opacity-30'
                  }`}
                  style={user.highlight ? { boxShadow: `0 0 20px ${colors.primary.main}20` } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg" style={{ color: colors.primary.main }}>
                      #{user.position}
                    </span>
                    <span className={user.highlight ? "font-semibold" : ""}>{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.points}</span>
                    <span className="text-sm text-gray-500">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}