import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { colors } from '@/styles/colors';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

const AdminHome = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      try {
        await router.replace('/admin/statistiques');
      } catch (error) {
        console.error('Erreur lors de la redirection:', error);
      } finally {
        setIsRedirecting(false);
      }
    };

    redirect();
  }, [router]);

  if (!isRedirecting) {
    return null;
  }

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center ${montserrat.className}`}
      style={{ backgroundColor: colors.background.page }}
    >
      <div className="text-center space-y-6">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        <p className="text-white text-2xl font-semibold tracking-wide">
          Redirection vers la page des statistiques...
        </p>
      </div>
    </div>
  );
};

export default AdminHome; 