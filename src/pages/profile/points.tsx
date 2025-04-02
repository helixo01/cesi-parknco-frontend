import React from "react";
import { Header } from "../../components/global/Header";
import { Division } from "../../components/global/Division";
import { colors } from "../../styles/colors";
import { Title } from "../../components/global/Title";
import { SettingsItem } from "../../components/global/SettingsItem";
import { FaCar, FaUsers, FaRoute, FaLeaf, FaTrophy } from "react-icons/fa";

export default function Points() {
  const statistics = [
    {
      icon: FaCar,
      title: "Trajets réalisés",
      value: "42"
    },
    {
      icon: FaUsers,
      title: "Passagers transportés",
      value: "128"
    },
    {
      icon: FaRoute,
      title: "Kilomètres covoiturés",
      value: "1,543 km"
    },
    {
      icon: FaLeaf,
      title: "CO₂ économisé",
      value: "246 kg"
    }
  ];

  const badges = [
    {
      icon: FaLeaf,
      title: "Éco-responsable",
      subtitle: "10 trajets effectués",
      color: "bg-green-500"
    },
    {
      icon: FaCar,
      title: "Super Covoitureur",
      subtitle: "25 trajets effectués • 17 restants",
      progress: 42
    }
  ];

  const ranking = [
    { position: "1", name: "Sarah M.", points: "1250" },
    { position: "2", name: "Marc D.", points: "980" },
    { position: "3", name: "Vous", points: "845", highlighted: true },
    { position: "4", name: "Julie L.", points: "820" },
    { position: "5", name: "Thomas R.", points: "790" }
  ];

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes" 
          texteGras="statistiques" 
        />

        <Division>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statistics.map((stat, index) => (
              <SettingsItem
                key={index}
                icon={stat.icon}
                label={stat.title}
                description={stat.value}
                className="bg-opacity-20 hover:bg-opacity-30 transition-all"
                style={{ backgroundColor: colors.primary.main }}
              />
            ))}
          </div>
        </Division>

        <Division>
          <Title texteNormal="Mes" texteGras="badges" />
          <div className="space-y-4 mt-4">
            {badges.map((badge, index) => (
              <SettingsItem
                key={index}
                icon={badge.icon}
                label={badge.title}
                description={badge.subtitle}
                progress={badge.progress}
                className="bg-opacity-20 hover:bg-opacity-30 transition-all"
                style={{ 
                  backgroundColor: badge.color === "bg-green-500" ? colors.state.success : colors.primary.main 
                }}
              />
            ))}
          </div>
        </Division>

        <Division>
          <Title texteNormal="Mon" texteGras="classement" />
          <div className="space-y-2 mt-4">
            {ranking.map((rank, index) => (
              <SettingsItem
                key={index}
                icon={FaTrophy}
                label={rank.name}
                description={`${rank.points} pts`}
                prefix={`#${rank.position}`}
                className={`transition-all ${
                  rank.highlighted 
                    ? "bg-opacity-20 hover:bg-opacity-30" 
                    : "bg-opacity-0 hover:bg-opacity-10"
                }`}
                style={{ backgroundColor: colors.primary.main }}
              />
            ))}
          </div>
        </Division>
      </div>
    </div>
  );
}