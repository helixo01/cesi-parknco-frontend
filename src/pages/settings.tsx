import React, { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiArrowLeft, FiBell, FiGlobe, FiLock, FiMapPin, FiCheck } from "react-icons/fi";
import { IoCarSportOutline } from "react-icons/io5";

interface Setting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

type SettingsType = {
  notifications: Setting[];
  trip: Setting[];
  privacy: Setting[];
};

export default function Settings() {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsType>({
    notifications: [
      {
        id: "email",
        title: "Notifications par email",
        description: "Recevoir des mises à jour par email",
        enabled: true,
      },
      {
        id: "push",
        title: "Notifications push",
        description: "Recevoir des notifications sur votre appareil",
        enabled: true,
      },
    ],
    trip: [
      {
        id: "eco",
        title: "Mode éco",
        description: "Privilégier les trajets écologiques",
        enabled: false,
      },
      {
        id: "electric",
        title: "Véhicules électriques",
        description: "Afficher uniquement les véhicules électriques",
        enabled: false,
      },
    ],
    privacy: [
      {
        id: "license",
        title: "Masquer la plaque",
        description: "Masquer votre plaque d'immatriculation",
        enabled: true,
      },
      {
        id: "location",
        title: "Partage de position",
        description: "Autoriser le partage de votre position",
        enabled: true,
      },
    ],
  });

  const [language, setLanguage] = useState("fr");

  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
  ];

  const toggleSetting = (category: keyof SettingsType, id: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: prev[category].map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      ),
    }));
  };

  const SettingSection = ({ 
    title, 
    icon, 
    settings, 
    category 
  }: { 
    title: string; 
    icon: React.ReactNode; 
    settings: Setting[];
    category: keyof SettingsType;
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-800">
        {icon}
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div className="space-y-3">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-90 transition-all duration-300"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <div>
              <h3 className="font-medium text-gray-800">{setting.title}</h3>
              <p className="text-sm text-gray-600">{setting.description}</p>
            </div>
            <button
              onClick={() => toggleSetting(category, setting.id)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                setting.enabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
                  setting.enabled ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col p-4 pb-20"
      style={{
        backgroundColor: colors.background.page,
        backgroundImage: `linear-gradient(to bottom right, ${colors.primary.light}20, ${colors.primary.light}05)`,
      }}
    >
      <div className="w-full max-w-md mx-auto space-y-8">
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-transform duration-300 hover:scale-110"
          style={{ backgroundColor: colors.primary.main }}
        >
          <FiArrowLeft size={20} />
        </button>

        <Title texteNormal="Mes" texteGras="Paramètres" />

        <div className="space-y-8">
          <SettingSection
            title="Notifications"
            icon={<FiBell size={24} />}
            settings={settings.notifications}
            category="notifications"
          />

          <SettingSection
            title="Préférences de trajet"
            icon={<IoCarSportOutline size={24} />}
            settings={settings.trip}
            category="trip"
          />

          <SettingSection
            title="Confidentialité"
            icon={<FiLock size={24} />}
            settings={settings.privacy}
            category="privacy"
          />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800">
              <FiGlobe size={24} />
              <h2 className="text-lg font-medium">Langue</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-3 rounded-lg flex items-center justify-between transition-all duration-300 ${
                    language === lang.code
                      ? "bg-white shadow-md"
                      : "bg-white bg-opacity-50 hover:bg-opacity-70"
                  }`}
                >
                  <span className="text-gray-800">{lang.name}</span>
                  {language === lang.code && (
                    <FiCheck className="text-green-500" size={20} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}
