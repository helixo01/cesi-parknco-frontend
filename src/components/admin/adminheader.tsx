// src/components/admin/AdminHeader.tsx
import React from 'react';
import { Logo } from '@/components/global/Logo';
import Link from 'next/link';
import { colors } from '@/styles/colors';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';

interface AdminHeaderProps {
  title?: string;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = 'Administration',
  activeTab = 'dashboard',
  setActiveTab = () => {},
}) => {
  const router = useRouter();

  const handleTabClick = (tab: string) => {
    if (tab === 'dashboard') {
      // Redirection vers Grafana
      window.open('https://grafana.com/auth/sign-in/', '_blank');
    } else {
      // Navigation interne
      setActiveTab(tab);
      router.push(`/admin/${tab}`);
    }
  };

  const handleLogoClick = () => {
    setActiveTab('');
    router.push('/admin');
  };

  const handleLogout = () => {
    // Ici vous pouvez ajouter la logique de déconnexion si nécessaire
    router.push('/login');
  };

  return (
    <header 
      className="w-full py-3 px-6 flex items-center justify-between shadow-md" 
      style={{ backgroundColor: colors.background.default }}
    >
      <div 
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <Logo width={50} height={50} shape="circle" />
        <span className="ml-3 text-lg font-semibold" style={{ color: colors.text.white }}>
          Park'nCo
        </span>
      </div>

      <nav className="flex items-center mx-auto">
        {['stats', 'gamification', 'dashboard', 'utilisateurs'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 mx-2 rounded transition-colors duration-200 ${
              activeTab === tab 
                ? 'bg-primary-main text-white' 
                : 'text-white hover:bg-primary-light hover:bg-opacity-20'
            }`}
            style={{
              backgroundColor: activeTab === tab ? colors.primary.main : 'transparent'
            }}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <button 
        className="flex items-center px-3 py-2 rounded text-sm font-medium hover:bg-opacity-90 transition-all"
        style={{ backgroundColor: colors.primary.main, color: "#FFFFFF" }}
        onClick={handleLogout}
      >
        <FiLogOut className="mr-2" size={16} />
        Déconnexion
      </button>
    </header>
  );
};