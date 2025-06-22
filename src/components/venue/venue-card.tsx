import React from 'react';
import { Venue } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { formatDistance, formatPrice, getStarRating } from '@/lib/utils';

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
  className?: string;
}

export function VenueCard({ venue, onClick, className }: VenueCardProps) {
  return (
    <Card 
      className={`flex p-4 cursor-pointer hover:bg-background-tertiary transition-colors ${className}`}
      onClick={onClick}
    >
      {/* Venue Image Placeholder */}
      <div className="w-20 h-20 bg-background-tertiary rounded-lg flex-shrink-0 mr-4 flex items-center justify-center text-2xl">
        {venue.category.icon}
      </div>
      
      {/* Venue Info */}
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">{venue.name}</h3>
            <p className="text-sm text-primary font-medium">{venue.category.displayName}</p>
          </div>
          {venue.isVerified && (
            <div className="text-success text-sm">✓</div>
          )}
        </div>
        
        <p className="text-sm text-text-secondary">
          {formatDistance(venue.distance)} • {venue.location.city}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-warning text-sm">{getStarRating(venue.rating.avg)}</span>
            <span className="text-xs text-text-muted">
              {venue.rating.avg} ({venue.rating.count})
            </span>
          </div>
          <span className="text-xs text-text-secondary">
            {formatPrice(venue.pricing.entryFeeMin, venue.pricing.entryFeeMax)}
          </span>
        </div>
      </div>
    </Card>
  );
}