import React from 'react';
import { Event } from '@/lib/types';
import { EventCard } from './event-card';

interface EventListProps {
  events: Event[];
  isGuest?: boolean;
}

export function EventList({ events, isGuest = false }: EventListProps) {
  const visibleEvents = isGuest ? events.slice(0, 2) : events;
  const hiddenEvents = isGuest ? events.slice(2) : [];

  return (
    <div className="space-y-4 p-4">
      {visibleEvents.map((event) => (
        <EventCard 
          key={event.id} 
          event={event}
        />
      ))}
      
      {isGuest && hiddenEvents.length > 0 && (
        <div className="relative">
          {/* Blurred Events */}
          <div className="filter blur-sm pointer-events-none">
            {hiddenEvents.slice(0, 1).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {/* Unlock Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background-primary/90 backdrop-blur-sm p-6 rounded-xl text-center border border-border">
              <div className="font-semibold text-text-primary mb-2">
                Mehr Events
              </div>
              <div className="text-sm text-text-secondary mb-4">
                Registriere dich kostenlos
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