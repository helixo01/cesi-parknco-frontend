import React from "react";
import { ProfilPic } from "@/components/global/ProfilPic";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { SettingsItem } from "@/components/global/SettingsItem";
import { colors } from "@/styles/colors";
import { AiOutlineUser, AiOutlineCar, AiOutlineStar, AiOutlineClockCircle, AiOutlineMessage, AiOutlineSetting, AiOutlineSafety } from "react-icons/ai";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex justify-center">
          <ProfilPic width={150} height={150} shape="circle" />
        </div>
        <Title texteNormal="Mon" texteGras="Profil" />
        <div className="space-y-4">
          <SettingsItem
            icon={AiOutlineUser}
            label="Informations personnelles"
            onClick={() => {}}
          />
          <SettingsItem
            icon={AiOutlineCar}
            label="Véhicule"
            onClick={() => {}}
          />
          <SettingsItem
            icon={AiOutlineStar}
            label="Points et statistiques"
            onClick={() => {}}
          />
          <SettingsItem
            icon={AiOutlineClockCircle}
            label="Réservation en cours"
            onClick={() => {}}
          />
          <SettingsItem
            icon={AiOutlineMessage}
            label="Feedback et avis"
            onClick={() => {}}
          />
          <SettingsItem
            icon={AiOutlineSafety}
            label="Gestion du compte"
            onClick={() => {}}
          />
          <SettingsItem
            icon={AiOutlineSetting}
            label="Paramètres"
            onClick={() => {}}
          />
        </div>
      </div>
      <NavBar activePage="profile" />
    </div>
  );
} 