'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MOCK_VENUES, MOCK_EVENTS } from '@/lib/mock-data';
import { formatPrice, getStarRating } from '@/lib/utils';

export default function VenueDetail() {
  const params = useParams();
  const router = useRouter();
  const venue = MOCK_VENUES.find(v => v.slug === params.slug);

  if (!venue) {
    return <div>Venue not found</div>;
  }

  const venueEvents = MOCK_EVENTS.filter(e => e.venue.id === venue.id);

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Status Bar */}
      <div className="flex justify-between items-center p-4 text-sm text-text-secondary">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        </div>
        <span>100%</span>
      </div>

      {/* Hero Section with Image */}
      <div className="relative h-52 bg-gradient-to-br from-primary to-primary-700">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0">
          {venue.media.coverImageUrl ? (
            <Image
              src={venue.media.coverImageUrl}
              alt={venue.name}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback zu Gradient wenn Bild nicht lädt
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-700" />
          )}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Navigation */}
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            ←
          </Button>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            ⋯
          </Button>
        </div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {venue.category.icon}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">{venue.name}</h1>
          <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
            {venue.category.displayName}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-warning">{getStarRating(venue.rating.avg)}</span>
            <span className="text-text-secondary text-sm">
              {venue.rating.avg} ({venue.rating.count} Bewertungen)
            </span>
            {venue.isVerified && (
              <span className="text-success text-sm ml-2">✓ Verifiziert</span>
            )}
          </div>
        </div>

        {/* Description */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-2">Beschreibung</h3>
          <p className="text-text-secondary leading-relaxed">{venue.description}</p>
        </Card>

        {/* Events */}
        {venueEvents.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-3">Nächste Events</h3>
            <div className="space-y-3">
              {venueEvents.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => router.push(`/event/${event.slug}`)}
                  className="flex items-center p-3 bg-background-tertiary rounded-lg cursor-pointer hover:bg-background-secondary transition-colors"
                >
                  <div className="bg-primary text-white px-2 py-1 rounded text-xs font-medium mr-3">
                    {event.timing.startsAt.getDate()} {event.timing.startsAt.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{event.title}</div>
                    <div className="text-sm text-text-secondary">
                      {event.timing.startsAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Info Grid */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-3">Informationen</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-tertiary p-3 rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Öffnungszeiten</div>
              <div className="font-medium text-text-primary">
                {Object.entries(venue.openingHours).find(([, hours]) => hours !== 'closed')?.[1] || 'Siehe Website'}
              </div>
            </div>
            <div className="bg-background-tertiary p-3 rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Entfernung</div>
              <div className="font-medium text-text-primary">{venue.distance}km</div>
            </div>
            <div className="bg-background-tertiary p-3 rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Eintritt</div>
              <div className="font-medium text-text-primary">
                {formatPrice(venue.pricing.entryFeeMin, venue.pricing.entryFeeMax)}
              </div>
            </div>
            <div className="bg-background-tertiary p-3 rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Altersbeschränkung</div>
              <div className="font-medium text-text-primary">{venue.ageRestriction}+ Jahre</div>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-3">Ausstattung</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(venue.features).map(([feature, available]) => (
              available && (
                <span 
                  key={feature}
                  className="bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium"
                >
                  {feature === 'parking' ? '🅿️ Parkplatz' : 
                   feature === 'wheelchair' ? '♿ Barrierefrei' :
                   feature === 'lockers' ? '🔒 Schließfächer' : feature}
                </span>
              )
            ))}
          </div>
        </Card>

        {/* Contact */}
        {(venue.contact.website || venue.contact.instagram) && (
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-3">Kontakt</h3>
            <div className="space-y-2">
              {venue.contact.website && (
                <div className="text-primary cursor-pointer hover:underline">
                  🌐 {venue.contact.website}
                </div>
              )}
              {venue.contact.instagram && (
                <div className="text-primary cursor-pointer hover:underline">
                  📱 {venue.contact.instagram}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}