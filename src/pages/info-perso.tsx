import React, { useState, useEffect } from "react";
import { Header } from "@/components/global/Header";
import { Division } from "@/components/global/Division";
import { FormInput } from "@/components/global/FormInput";
import { ProfilPic } from "@/components/global/ProfilPic";
import { Button } from "@/components/global/Button";
import { colors } from "@/styles/colors";
import { userService } from "@/services/userService";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { IoMdArrowBack } from "react-icons/io";

export default function InfoPerso() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    formation: "personnel",
    specialite: "informatique",
    year: "1",
    profilePicture: ""
  });

  const formationOptions = [
    { value: "personnel", label: "Personnel" },
    { value: "master", label: "Master" },
    { value: "cpi", label: "CPI" },
    { value: "fise", label: "FISE" },
    { value: "fisa", label: "FISA" },
  ];

  const specialiteOptions = [
    { value: "informatique", label: "Informatique" },
    { value: "btp", label: "BTP" },
    { value: "generaliste", label: "Généraliste" },
  ];

  const getYearOptions = (formation: string) => {
    if (formation === "personnel") return [];
    if (formation === "master") {
      return Array.from({ length: 2 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}${i === 0 ? 'ère' : 'ème'} année`,
      }));
    }
    if (formation === "cpi") {
      return Array.from({ length: 2 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}${i === 0 ? 'ère' : 'ème'} année`,
      }));
    }
    if (formation === "fise" || formation === "fisa") {
      return Array.from({ length: 3 }, (_, i) => ({
        value: String(i + 3),
        label: `${i + 3}ème année`,
      }));
    }
    return [];
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getUserData();
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          formation: data.formation || "personnel",
          specialite: data.specialite || "informatique",
          year: data.year || "1",
          profilePicture: data.profilePicture || ""
        });
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Erreur lors de la récupération des données");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePictureChange = async (file: File) => {
    try {
      setSaving(true);
      const profilePictureUrl = await userService.updateProfilePicture(file);
      setUserData(prev => ({ ...prev, profilePicture: profilePictureUrl }));
      setSaving(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la photo de profil:", error);
      setError("Erreur lors de la mise à jour de la photo de profil");
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      await userService.updateUserData(userData);
      setSaving(false);
      router.push("/profile");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      setError("Erreur lors de la mise à jour du profil");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background.page }}>
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.push("/profile")}
          className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <IoMdArrowBack size={24} />
        </button>
        <Header texteNormal="Informations" texteGras="personnelles" className="ml-2" />
      </div>

      <div className="w-full max-w-md mx-auto space-y-6">
        <Division>
          <div className="flex justify-center mb-6">
            <ProfilPic
              src={userData.profilePicture || "/default-profile.png"}
              onImageChange={handleProfilePictureChange}
              width={120}
              height={120}
              shape="circle"
            />
          </div>

          <div className="space-y-4">
            <FormInput
              label="Prénom"
              value={userData.firstName}
              onChange={(value) => setUserData(prev => ({ ...prev, firstName: value }))}
              disabled={saving}
              required
            />

            <FormInput
              label="Nom"
              value={userData.lastName}
              onChange={(value) => setUserData(prev => ({ ...prev, lastName: value }))}
              disabled={saving}
              required
            />

            <FormInput
              label="Email"
              value={userData.email}
              onChange={(value) => setUserData(prev => ({ ...prev, email: value }))}
              disabled={saving}
              required
              type="email"
            />

            <FormInput
              label="Formation"
              type="select"
              value={userData.formation}
              onChange={(value) => setUserData(prev => ({ ...prev, formation: value, year: "1" }))}
              options={formationOptions}
              disabled={saving}
            />

            <FormInput
              label="Spécialité"
              type="select"
              value={userData.specialite}
              onChange={(value) => setUserData(prev => ({ ...prev, specialite: value }))}
              options={specialiteOptions}
              disabled={saving}
            />

            {userData.formation !== "personnel" && (
              <FormInput
                label="Année"
                type="select"
                value={userData.year}
                onChange={(value) => setUserData(prev => ({ ...prev, year: value }))}
                options={getYearOptions(userData.formation)}
                disabled={saving}
              />
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-4">
              {error}
            </div>
          )}

          <div className="mt-6">
            <Button
              text={saving ? "Enregistrement..." : "Enregistrer"}
              onClick={handleSubmit}
              disabled={saving}
              fullWidth
            />
          </div>
        </Division>
      </div>

      <NavBar activePage="profile" />
    </div>
  );
}