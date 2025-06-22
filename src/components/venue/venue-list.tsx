import React from 'react';
import { Venue } from '@/lib/types';
import { VenueCard } from './venue-card';

interface VenueListProps {
  venues: Venue[];
  isGuest?: boolean;
}

export function VenueList({ venues, isGuest = false }: VenueListProps) {
  const visibleVenues = isGuest ? venues.slice(0, 2) : venues;
  const hiddenVenues = isGuest ? venues.slice(2) : [];

  return (
    <div className="space-y-4 p-4">
      {visibleVenues.map((venue) => (
        <VenueCard 
          key={venue.id} 
          venue={venue}
        />
      ))}
      
      {isGuest && hiddenVenues.length > 0 && (
        <div className="relative">
          {/* Blurred Venues */}
          <div className="filter blur-sm pointer-events-none">
            {hiddenVenues.slice(0, 1).map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          
          {/* Unlock Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background-primary/90 backdrop-blur-sm p-6 rounded-xl text-center border border-border">
              <div className="font-semibold text-text-primary mb-2">
                Alle Venues sehen
              </div>
              <div className="text-sm text-text-secondary mb-4">
                Kostenlos registrieren
              </div>
              <button 
                onClick={() => window.location.href = '/auth/register'}
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                Registrieren
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}