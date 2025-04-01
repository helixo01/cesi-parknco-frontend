import React, { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiArrowLeft, FiShield, FiTrash2, FiAlertCircle, FiLogOut } from "react-icons/fi";

export default function AccountManagement() {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [accountStatus] = useState("active"); // In a real app, this would come from an API

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200"
        };
      case "suspended":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          border: "border-red-200"
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200"
        };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Compte actif";
      case "suspended":
        return "Compte suspendu";
      default:
        return "Statut inconnu";
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
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/profile')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft size={24} color={colors.primary.main} />
          </button>
          <Title texteNormal="Gestion du" texteGras="compte" />
          <div className="w-10" /> {/* Espaceur pour maintenir l'alignement */}
        </div>

        <div className="space-y-6">
          {/* Account Status */}
          <div 
            className={`p-4 rounded-lg border ${getStatusColor(accountStatus).border} ${getStatusColor(accountStatus).bg}`}
          >
            <div className="flex items-center gap-3">
              <FiShield className={getStatusColor(accountStatus).text} size={24} />
              <div>
                <h3 className={`font-medium ${getStatusColor(accountStatus).text}`}>
                  {getStatusText(accountStatus)}
                </h3>
                <p className="text-sm text-gray-600">
                  Dernière mise à jour: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div 
            className="p-6 rounded-lg shadow-lg space-y-6"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary.main}15, ${colors.primary.light}30)`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FiShield /> Sécurité du compte
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white">
                <h3 className="font-medium text-white">Dernière connexion</h3>
                <p className="text-sm text-gray-700">
                  {new Date().toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white">
                <h3 className="font-medium text-white">Appareil</h3>
                <p className="text-sm text-gray-700">
                  {navigator.userAgent}
                </p>
              </div>
            </div>
          </div>

          {/* Delete Account */}
          <div 
            className="p-6 rounded-lg shadow-lg space-y-4"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary.main}15, ${colors.primary.light}30)`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-start gap-3">
              <FiTrash2 className="text-red-500 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-white">Supprimer le compte</h3>
                <p className="text-sm text-gray-600">
                  Cette action est irréversible. Toutes vos données seront supprimées conformément au RGPD.
                </p>
              </div>
            </div>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Supprimer mon compte
              </button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-start gap-2">
                    <FiAlertCircle className="text-red-500 mt-1" />
                    <p className="text-sm text-red-700">
                      Êtes-vous sûr de vouloir supprimer votre compte ? Cette action ne peut pas être annulée.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-2 px-4 text-white rounded-lg transition-colors"
                    style={{ backgroundColor: '#ef4444' }}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      // Here you would typically make an API call to delete the account
                      alert("Compte supprimé");
                      router.push('/');
                    }}
                    className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Confirmer la suppression
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout */}
          <div 
            className="p-6 rounded-lg shadow-lg space-y-4"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary.main}15, ${colors.primary.light}30)`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-start gap-3">
              <FiLogOut className="text-gray-600 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-white">Déconnexion</h3>
                <p className="text-sm text-gray-700">
                  Se déconnecter de l'application
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                // Here you would typically clear the session/tokens
                router.push('/login');
              }}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}
