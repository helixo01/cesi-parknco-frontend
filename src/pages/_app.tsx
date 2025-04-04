import { Montserrat } from "next/font/google";
import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import "../styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${montserrat.variable} font-sans`}>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </main>
  );
}
