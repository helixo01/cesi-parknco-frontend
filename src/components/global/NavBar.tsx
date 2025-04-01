import React from "react";
import { useRouter } from "next/router";
import { 
  AiOutlineHome, 
  AiOutlineMessage, 
  AiOutlineCar, 
  AiOutlineUser 
} from "react-icons/ai";
import { colors } from "@/styles/colors";

interface NavBarProps {
  activePage?: "home" | "messages" | "trips" | "profile";
}

export const NavBar: React.FC<NavBarProps> = ({ activePage = "home" }) => {
  const router = useRouter();

  const getIconColor = (page: string) => {
    return activePage === page 
      ? colors.components.navbar.icon.active 
      : colors.components.navbar.icon.inactive;
  };

  const navItems = [
    { icon: AiOutlineHome, label: "Accueil", page: "home", route: "/home" },
    { icon: AiOutlineMessage, label: "Messages", page: "messages", route: "/messages" },
    { icon: AiOutlineCar, label: "Trajets", page: "trips", route: "/trips" },
    { icon: AiOutlineUser, label: "Profil", page: "profile", route: "/profile" },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0" 
      style={{ backgroundColor: colors.components.navbar.background }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.page}
              onClick={() => router.push(item.route)}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <Icon 
                size={30} 
                color={getIconColor(item.page)}
              />
              <span 
                className="text-sm mt-1"
                style={{ 
                  color: getIconColor(item.page),
                  fontSize: "14px"
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}; 