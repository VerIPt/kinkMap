import React from 'react';
import { Event } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { formatDate, formatPrice } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
  className?: string;
}

export function EventCard({ event, onClick, className }: EventCardProps) {
  return (
    <Card 
      className={`p-4 cursor-pointer hover:bg-background-tertiary transition-colors border-l-4 border-l-primary ${className}`}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-semibold text-primary mb-1">
              {formatDate(event.timing.startsAt)}
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              {event.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {event.venue.name} • {event.venue.location.city}
            </p>
          </div>
          {event.isFeatured && (
            <div className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </div>
          )}
        </div>
        
        <p className="text-sm text-text-muted leading-relaxed">
          {event.shortDescription}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary font-medium">
            {formatPrice(event.ticketing.priceMin, event.ticketing.priceMax)}
          </span>
          <span className="text-text-secondary">
            {event.stats.interestedCount} interessiert
          </span>
        </div>
      </div>
    </Card>
  );
}