import React from 'react';
import { useRouter } from 'next/router';
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { ProfilPic } from "@/components/global/ProfilPic";
import { SettingsItem } from "@/components/global/SettingsItem";
import { colors } from "@/styles/colors";
import { AiOutlineUser, AiOutlineCar, AiOutlineStar, AiOutlineClockCircle, AiOutlineMessage, AiOutlineSafety, AiOutlineSetting } from "react-icons/ai";
import { AiFillEnvironment } from "react-icons/ai";

export default function Profile() {
  const router = useRouter();
  
  return (
    <div 
      className="min-h-screen flex flex-col p-4 pb-20" 
      style={{ 
        backgroundColor: colors.background.page,
        backgroundImage: `linear-gradient(to bottom right, ${colors.primary.light}20, ${colors.primary.light}05)`
      }}
    >
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex justify-center">
          <div className="relative group">
            <ProfilPic width={150} height={150} shape="circle" />
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <button 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-medium"
                onClick={() => router.push('/personal-info')}
              >
                Modifier
              </button>
            </div>
            {/* Badge */}
            <div 
              className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
              style={{ 
                backgroundColor: '#22c55e', // green-500
                color: 'white',
              }}
              onClick={() => router.push('/stats-info')}
              title="Badge Éco-responsable - 10 trajets effectués"
            >
              <AiFillEnvironment size={24} />
            </div>
          </div>
        </div>

        <Title texteNormal="Mon" texteGras="Profil" />

        <div className="space-y-4">
          <SettingsItem
            icon={AiOutlineUser}
            label="Informations personnelles"
            onClick={() => router.push('/personal-info')}
          />
          <SettingsItem
            icon={AiOutlineCar}
            label="Véhicule"
            onClick={() => router.push('/vehicle-info')}
          />
          <SettingsItem
            icon={AiOutlineStar}
            label="Points et statistiques"
            onClick={() => router.push('/stats-info')}
          />
          <SettingsItem
            icon={AiOutlineClockCircle}
            label="Réservation en cours"
            onClick={() => router.push('/reservations-info')}
          />
          <SettingsItem
            icon={AiOutlineMessage}
            label="Feedback et avis"
            onClick={() => router.push('/feedback-info')}
          />
          <SettingsItem
            icon={AiOutlineSafety}
            label="Gestion du compte"
            onClick={() => router.push('/account-management')}
          />
          <SettingsItem
            icon={AiOutlineSetting}
            label="Paramètres"
            onClick={() => router.push('/settings')}
          />
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}