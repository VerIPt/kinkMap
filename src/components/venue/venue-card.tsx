'use client';
import React from 'react';
import { Venue } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { formatDistance, formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon, StarRating } from '@/components/ui/icon';

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
  className?: string;
}

export function VenueCard({ venue, onClick, className }: VenueCardProps) {
  const router = useRouter();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/venue/${venue.slug}`);
    }
  };

  const getCategoryIcon = (categoryName: string): string => {
    const iconMap: { [key: string]: string } = {
      'pornokinos': 'cinema',
      'bars': 'bar',
      'sexshops': 'sexshop', 
      'swingerclubs': 'swingerclub',
      'fetischclubs': 'bdsm',
      'clubs': 'club',
      'gloryholes': 'community',
      'bdsm-studios': 'bdsm',
      'saunas': 'sauna',
      'dungeons': 'bdsm',
      'adult-theaters': 'theater'
    };
    return iconMap[categoryName] || 'house';
  };

  return (
    <Card 
      className={`flex p-4 cursor-pointer hover:bg-background-tertiary transition-colors ${className}`}
      onClick={handleClick}
    >
      {/* Venue Image/Icon */}
      <div className="w-20 h-20 bg-background-tertiary rounded-lg flex-shrink-0 mr-4 relative overflow-hidden">
        {venue.media.logoUrl ? (
          <Image
            src={venue.media.logoUrl}
            alt={venue.name}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon 
              name={getCategoryIcon(venue.category.name)} 
              size={32} 
              color="#888888"
              containerColor="#d32f2f"
              showContainer={true}
            />
          </div>
        )}
      </div>
      
      {/* Venue Info */}
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">{venue.name}</h3>
            <p className="text-sm text-primary font-medium">{venue.category.displayName}</p>
          </div>
          {venue.isVerified && (
            <Icon name="check" size={16} color="#4ecdc4" />
          )}
        </div>
        
        <p className="text-sm text-text-secondary">
          {formatDistance(venue.distance)} • {venue.location.city}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={venue.rating.avg} size={14} color="#feca57" />
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