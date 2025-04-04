import React, { useEffect, useState } from "react";
import { ProfilPic } from "@/components/global/ProfilPic";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { SettingsItem } from "@/components/global/SettingsItem";
import { colors } from "@/styles/colors";
import { AiOutlineUser, AiOutlineCar, AiOutlineStar, AiOutlineClockCircle, AiOutlineMessage, AiOutlineSetting, AiOutlineSafety } from "react-icons/ai";
import { useRouter } from "next/router";
import { userService } from "@/services/userService";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ profilePicture?: string | null }>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getUserData();
        setUserData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = async (file: File) => {
    try {
      const newProfilePicture = await userService.updateProfilePicture(file);
      setUserData(prev => ({ ...prev, profilePicture: newProfilePicture }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la photo de profil:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex justify-center">
          <ProfilPic 
            width={150} 
            height={150} 
            shape="circle" 
            src={userData.profilePicture}
            editable
            onImageChange={handleImageChange}
          />
        </div>
        <Title texteNormal="Mon" texteGras="Profil" />
        <div className="space-y-4">
          <SettingsItem
            icon={AiOutlineUser}
            label="Informations personnelles"
            onClick={() => router.push("/profile/info-perso")}
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