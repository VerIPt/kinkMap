'use client';
import React from 'react';
import { Event } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { formatDate, formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/icon';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
  className?: string;
}

export function EventCard({ event, onClick, className }: EventCardProps) {
  const router = useRouter();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/event/${event.slug}`);
    }
  };

  const getEventIcon = (eventType: string): string => {
    const iconMap: { [key: string]: string } = {
      'party': 'club',
      'workshop': 'community',
      'meetup': 'community',
      'private': 'house',
      'show': 'theater',
      'social': 'community',
      'session': 'bdsm',
      'screening': 'cinema',
      'cultural': 'theater',
      'exclusive': 'heart',
      'cruising': 'community'
    };
    return iconMap[eventType] || 'event';
  };

  return (
    <Card 
      className={`p-4 cursor-pointer hover:bg-background-tertiary transition-colors border-l-4 border-l-primary ${className}`}
      onClick={handleClick}
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
          <div className="flex items-center gap-2">
            <Icon 
              name={getEventIcon(event.eventType)} 
              size={20} 
              color="#d32f2f"
            />
            {event.isFeatured && (
              <div className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-text-muted leading-relaxed">
          {event.shortDescription}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary font-medium">
            {formatPrice(event.ticketing.priceMin, event.ticketing.priceMax)}
          </span>
          <div className="flex items-center gap-1">
            <Icon name="heart" size={12} color="#888888" />
            <span className="text-text-secondary">
              {event.stats.interestedCount} interessiert
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}