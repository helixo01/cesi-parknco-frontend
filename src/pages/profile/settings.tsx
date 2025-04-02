import React, { useState } from "react";
import { Header } from "@/components/global/Header";
import { Division } from "@/components/global/Division";
import { FaBell, FaCar, FaLock, FaGlobe } from "react-icons/fa";
import { colors } from "@/styles/colors";

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
      enabled ? "bg-green-500" : "bg-gray-600"
    }`}
  >
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ${
        enabled ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);

const SettingOption = ({ 
  title, 
  description, 
  enabled, 
  onToggle 
}: { 
  title: string; 
  description: string; 
  enabled: boolean; 
  onToggle: () => void;
}) => (
  <div
    className="p-4 rounded-lg"
    style={{ backgroundColor: colors.background.navbar }}
  >
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div style={{ color: colors.text.white }}>{title}</div>
        <div className="text-sm" style={{ color: colors.text.placeholder }}>
          {description}
        </div>
      </div>
      <Toggle enabled={enabled} onChange={onToggle} />
    </div>
  </div>
);

const LanguageButton = ({ 
  language, 
  selected, 
  onClick 
}: { 
  language: string; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <button
    className="p-3 rounded-lg transition-colors duration-200"
    style={{
      backgroundColor: selected ? colors.primary.main : colors.background.navbar,
    }}
    onClick={onClick}
  >
    <span style={{ color: colors.text.white }}>{language}</span>
  </button>
);

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    ecoMode: false,
    electricVehicles: false,
    hidePlate: true,
    shareLocation: true,
  });

  const sections = [
    {
      id: "notifications",
      icon: FaBell,
      title: "Notifications",
      options: [
        {
          id: "emailNotifications",
          title: "Notifications par email",
          description: "Recevoir des mises à jour par email",
        },
        {
          id: "pushNotifications",
          title: "Notifications push",
          description: "Recevoir des notifications sur votre appareil",
        },
      ],
    },
    {
      id: "preferences",
      icon: FaCar,
      title: "Préférences de trajet",
      options: [
        {
          id: "ecoMode",
          title: "Mode éco",
          description: "Privilégier les trajets écologiques",
        },
        {
          id: "electricVehicles",
          title: "Véhicules électriques",
          description: "Afficher uniquement les véhicules électriques",
        },
      ],
    },
    {
      id: "privacy",
      icon: FaLock,
      title: "Confidentialité",
      options: [
        {
          id: "hidePlate",
          title: "Masquer la plaque",
          description: "Masquer votre plaque d'immatriculation",
        },
        {
          id: "shareLocation",
          title: "Partage de position",
          description: "Autoriser le partage de votre position",
        },
      ],
    },
  ] as const;

  const handleToggle = (id: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const languages = ["Français"] as const;
  const [selectedLanguage, setSelectedLanguage] = useState<typeof languages[number]>("Français");

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes" 
          texteGras="paramètres" 
        />

        {sections.map((section) => (
          <Division key={section.id}>
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <section.icon className="w-5 h-5" style={{ color: colors.text.label }} />
                <span className="text-lg font-medium" style={{ color: colors.text.label }}>
                  {section.title}
                </span>
              </div>

              <div className="space-y-4">
                {section.options.map((option) => (
                  <SettingOption
                    key={option.id}
                    title={option.title}
                    description={option.description}
                    enabled={settings[option.id as keyof typeof settings]}
                    onToggle={() => handleToggle(option.id as keyof typeof settings)}
                  />
                ))}
              </div>
            </div>
          </Division>
        ))}

        <Division>
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <FaGlobe className="w-5 h-5" style={{ color: colors.text.label }} />
              <span className="text-lg font-medium" style={{ color: colors.text.label }}>
                Langue
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <LanguageButton
                  key={lang}
                  language={lang}
                  selected={selectedLanguage === lang}
                  onClick={() => setSelectedLanguage(lang)}
                />
              ))}
            </div>
          </div>
        </Division>
      </div>
    </div>
  );
}