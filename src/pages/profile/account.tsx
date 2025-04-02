import React from "react";
import { Header } from "@/components/global/Header";
import { Division } from "@/components/global/Division";
import { Button } from "@/components/global/Button";
import { SettingsItem } from "@/components/global/SettingsItem";
import { FaShieldAlt, FaSignOutAlt, FaTrash, FaDesktop, FaClock } from "react-icons/fa";
import { colors } from "@/styles/colors";

export default function Account() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const formattedTime = currentDate.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const userAgent = window.navigator.userAgent;

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Gestion du" 
          texteGras="compte" 
        />

        <Division>
          <div className="p-4 rounded-lg space-y-2" style={{ backgroundColor: colors.state.success + "20" }}>
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="w-5 h-5" style={{ color: colors.state.success }} />
              <span className="font-medium" style={{ color: colors.state.success }}>
                Compte actif
              </span>
            </div>
            <div style={{ color: colors.text.placeholder }}>
              Dernière mise à jour: {formattedDate}
            </div>
          </div>
        </Division>

        <Division>
          <div className="space-y-4">
            <div className="text-lg font-medium" style={{ color: colors.text.label }}>
              Sécurité du compte
            </div>
            <SettingsItem
              icon={FaClock}
              label="Dernière connexion"
              description={`${formattedDate} ${formattedTime}`}
              className="bg-opacity-20"
              style={{ backgroundColor: colors.background.navbar }}
            />
            <SettingsItem
              icon={FaDesktop}
              label="Appareil"
              description={userAgent}
              className="bg-opacity-20"
              style={{ backgroundColor: colors.background.navbar }}
            />
          </div>
        </Division>

        <Division>
          <div className="space-y-4">
            <div className="text-lg font-medium" style={{ color: colors.text.label }}>
              Supprimer le compte
            </div>
            <div className="space-y-2">
              <div style={{ color: colors.text.placeholder }}>
                Cette action est irréversible. Toutes vos données seront supprimées conformément au RGPD.
              </div>
              <button
                className="w-full p-4 rounded-lg flex items-center justify-center space-x-2"
                style={{ backgroundColor: colors.state.error }}
                onClick={() => {}}
              >
                <FaTrash className="w-5 h-5" style={{ color: colors.text.white }} />
                <span style={{ color: colors.text.white }}>Supprimer mon compte</span>
              </button>
            </div>
          </div>
        </Division>

        <Division>
          <div className="space-y-4">
            <div className="text-lg font-medium" style={{ color: colors.text.label }}>
              Déconnexion
            </div>
            <div className="space-y-2">
              <div style={{ color: colors.text.placeholder }}>
                Se déconnecter de l'application
              </div>
              <Button
                text="Se déconnecter"
                variant="secondary"
                onClick={() => {}}
                className="w-full"
                icon={<FaSignOutAlt className="w-5 h-5" />}
              />
            </div>
          </div>
        </Division>
      </div>
    </div>
  );
}