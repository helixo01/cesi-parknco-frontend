import React from "react";
import { Logo } from "@/components/global/Logo";
import { Button } from "@/components/global/Button";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { ImageComponent } from "@/components/global/Image";
import { colors } from "@/styles/colors";
import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { useRouter } from "next/router";

export default function Home() {
  const [firstName, setFirstName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getUserData();
        setFirstName(userData.firstName);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo width={175} height={175} shape="circle" />
        </div>
        <Title 
          texteNormal="Bienvenue"
          texteGras={firstName}
          texteNormal2=", prêt à covoiturer ?"
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
        <div className="space-y-8">
          <Button
            text="Recherche d'un trajet"
            variant="primary"
            onClick={() => router.push("/search-trip")}
          />
          <Button
            text="Proposer un trajet"
            variant="primary"
            onClick={() => router.push("/add-trip")}
          />
        </div>
      </div>
      <NavBar activePage="home" />
    </div>
  );
}