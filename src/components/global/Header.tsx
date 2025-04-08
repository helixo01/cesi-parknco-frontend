import React from "react";
import { Title } from "@/components/global/Title";
import { Logo } from "@/components/global/Logo";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { colors } from "@/styles/colors";

interface HeaderProps {
  texteNormal: string;
  texteGras: string;
  texteNormal2?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  texteNormal,
  texteGras,
  texteNormal2,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full">
      <button 
        onClick={() => router.back()}
        className="flex items-center justify-center"
      >
        <AiOutlineArrowLeft size={32} color={colors.components.header.arrow} />
      </button>
      <Title 
        texteNormal={texteNormal}
        texteGras={texteGras}
        texteNormal2={texteNormal2}
      />
      <button 
        onClick={() => router.push("/home")}
        className="flex items-center justify-center"
      >
        <Logo width={40} height={40} shape="square" />
      </button>
    </div>
  );
}; 