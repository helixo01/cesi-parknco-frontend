import { Logo } from "@/components/global/Logo";
import { Button } from "@/components/global/Button";
import { NavBar } from "@/components/global/NavBar";
import { Titre } from "@/components/global/Titre";
import { ImageComponent } from "@/components/global/Image";
import { colors } from "@/styles/colors";
import { useEffect, useState } from "react";
import { userService } from "@/services/userService";

export default function Home() {
  const [prenom, setPrenom] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getUserData();
        setPrenom(userData.prenom);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo width={175} height={175} shape="circle" />
        </div>
        <Titre 
          texteNormal="Bienvenue"
          texteGras={`${prenom}, prêt à covoiturer ?`}
        />
        <div className="flex justify-center">
          <ImageComponent 
            src="/fond-acceuil.jpg"
            alt="Fond d'accueil"
            width={400}
            height={200}
            className="w-full max-w-md"
          />
        </div>
        <div className="space-y-4">
          <Button
            text="Trouver un trajet"
            variant="primary"
            onClick={() => {}}
          />
          <Button
            text="Proposer un trajet"
            variant="primary"
            onClick={() => {}}
          />
        </div>
      </div>
      <NavBar activePage="home" />
    </div>
  );
} 