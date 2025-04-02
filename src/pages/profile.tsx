import React from "react";
import { ProfilPic } from "@/components/global/ProfilPic";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { SettingsItem } from "@/components/global/SettingsItem";
import { colors } from "@/styles/colors";
import { AiOutlineUser, AiOutlineCar, AiOutlineStar, AiOutlineClockCircle, AiOutlineMessage, AiOutlineSetting, AiOutlineSafety } from "react-icons/ai";
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();

  const handleInfoPersoClick = () => {
    router.push('/profile/info-perso');
  };

  const handleVehicleClick = () => {
    router.push('/profile/vehicle');
  };

  const handlePointsClick = () => {
    router.push('/profile/points');
  };

  const handleReservationsClick = () => {
    router.push('/profile/reservations');
  };

  const handleFeedbackClick = () => {
    router.push('/profile/feedback');
  };

  const handleAccountClick = () => {
    router.push('/profile/account');
  };

  const handleSettingsClick = () => {
    router.push('/profile/settings');
  };

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex justify-center">
          <ProfilPic width={150} height={150} shape="circle" />
        </div>
        <Title texteNormal="Mon" texteGras="profil" />
        <div className="space-y-4">
          <SettingsItem
            icon={AiOutlineUser}
            label="Informations personnelles"
            onClick={handleInfoPersoClick}
          />
          <SettingsItem
            icon={AiOutlineCar}
            label="Véhicule"
            onClick={handleVehicleClick}
          />
          <SettingsItem
            icon={AiOutlineStar}
            label="Points et statistiques"
            onClick={handlePointsClick}
          />
          <SettingsItem
            icon={AiOutlineClockCircle}
            label="Réservations en cours"
            onClick={handleReservationsClick}
          />
          <SettingsItem
            icon={AiOutlineMessage}
            label="Feedback et avis"
            onClick={handleFeedbackClick}
          />
          <SettingsItem
            icon={AiOutlineSafety}
            label="Gestion du compte"
            onClick={handleAccountClick}
          />
          <SettingsItem
            icon={AiOutlineSetting}
            label="Paramètres"
            onClick={handleSettingsClick}
          />
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
}