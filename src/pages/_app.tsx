import { Montserrat } from "next/font/google";
import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import "../styles/globals.css";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authService } from '@/services/auth';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const user = await authService.getCurrentUser();
        const path = router.pathname;

        // Si l'utilisateur est sur la page d'accueil et qu'il est admin
        if (path === '/home' && (user.role === 'admin_user' || user.role === 'admin_tech')) {
          router.replace('/admin/statistiques');
        }
        // Si l'utilisateur est sur une page admin et qu'il n'est pas admin
        else if (path.startsWith('/admin') && user.role === 'user') {
          router.replace('/home');
        }
      } catch (error) {
        // Si l'utilisateur n'est pas connecté et n'est pas sur la page de login
        if (router.pathname !== '/login' && router.pathname !== '/inscription') {
          router.replace('/login');
        }
      }
    };

    checkUserRole();
  }, [router.pathname]);

  return (
    <main className={`${montserrat.variable} font-sans`}>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </main>
  );
}
