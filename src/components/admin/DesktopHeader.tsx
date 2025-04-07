import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiLogOut, FiExternalLink } from 'react-icons/fi';
import { colors } from '@/styles/colors';
import { Montserrat } from 'next/font/google';
import { Logo } from '@/components/global/Logo';
import { authService } from '@/services/auth';
import { toast } from 'react-hot-toast';

const montserrat = Montserrat({ subsets: ['latin'] });

interface NavItem {
  label: string;
  path: string;
  isExternal?: boolean;
}

interface DesktopHeaderProps {
  items: NavItem[];
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ items }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <header 
      className={`${montserrat.className} bg-opacity-90 backdrop-blur-sm sticky top-0 z-50`}
      style={{ backgroundColor: colors.components.navbar.background }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0 mr-8">
            <Logo width={50} height={50} shape="square" />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {items.map((item, index) => (
              <React.Fragment key={item.path}>
                {index > 0 && (
                  <div className="h-5 w-px bg-white opacity-20"></div>
                )}
                {item.isExternal ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-base font-medium hover:scale-105 transition-transform"
                    style={{
                      color: colors.components.navbar.icon.inactive
                    }}
                  >
                    <span>{item.label}</span>
                    <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <Link
                    href={item.path}
                    className="text-base font-medium hover:scale-105 transition-transform"
                    style={{
                      color: currentPath === item.path
                        ? colors.components.navbar.icon.active
                        : colors.components.navbar.icon.inactive
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex-grow"></div>
          <button
            onClick={handleLogout}
            className="group flex items-center space-x-2 px-6 py-2 rounded-md hover:opacity-90 transition-all"
            style={{
              backgroundColor: colors.state.error,
              color: colors.text.white
            }}
          >
            <span className="text-base font-medium">Déconnexion</span>
            <FiLogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>
    </header>
  );
}; 