'use client';

import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
import { colors } from "@/styles/colors";
import TripItemDetail from '@/components/trip/TripItemDetail';

const DEFAULT_PROFILE_IMAGE = '/pp.webp';

// Données d'exemple pour les trajets
const exampleTrips = [
  {
    id: '1',
    startDate: new Date('2024-03-17'),
    startTime: '17h05',
    endTime: '17h47',
    from: 'Arras',
    fromAddress: '45 Boulevard Faidherbe, Centre Commercial Les Trois Lys, 2ème étage près de l\'entrée principale, en face du parking souterrain P2',
    to: 'Lille',
    toAddress: '18 Place de la Gare, Gare Lille Flandres, Entrée principale côté centre commercial Euralille, près du point information SNCF',
    duration: '42 min',
    userName: 'Richard P.',
    userImage: DEFAULT_PROFILE_IMAGE,
    rating: 5
  }
];

export default function Trips() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background.page }}>
      <div className="flex-1 flex flex-col p-4 pb-24">
        <Header 
          texteNormal="Mes"
          texteGras="Trajets"
        />
        <div className="flex-1 flex items-start justify-center py-8">
          <div className="w-full max-w-4xl">
            {exampleTrips.map((trip) => (
              <TripItemDetail
                key={trip.id}
                {...trip}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <NavBar activePage="trips" />
      </div>
    </div>
  );
} 