'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { formatDate, formatPrice } from '@/lib/utils';

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const event = MOCK_EVENTS.find(e => e.slug === params.slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header with back button */}
      <Header showBackButton={true} showHomeButton={true} title={event.title} />

      {/* Hero Section with Image */}
      <div className="relative h-56 bg-gradient-to-br from-primary to-primary-700">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0">
          {event.media.coverImageUrl ? (
            <Image
              src={event.media.coverImageUrl}
              alt={event.title}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-700" />
          )}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Event Date Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm p-3 rounded-lg text-center text-white">
          <div className="text-xl font-bold">
            {event.timing.startsAt.getDate()}
          </div>
          <div className="text-xs text-accent font-semibold">
            {event.timing.startsAt.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase()}
          </div>
        </div>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
            🎭
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <div 
            onClick={() => router.push(`/venue/${event.venue.slug}`)}
            className="text-accent font-semibold mb-2 cursor-pointer hover:underline"
          >
            @ {event.venue.name}
          </div>
          <div className="text-text-secondary">
            {formatDate(event.timing.startsAt)}
            {event.timing.endsAt && ` - ${event.timing.endsAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`}
          </div>
        </div>

        {/* Description */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-3">Beschreibung</h3>
          <p className="text-text-secondary leading-relaxed">{event.description}</p>
        </Card>

        {/* Event Details */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-4">Details</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="text-2xl mr-4">💶</div>
              <div className="flex-1">
                <div className="text-sm text-text-secondary">Eintritt</div>
                <div className="font-medium text-text-primary">
                  {formatPrice(event.ticketing.priceMin, event.ticketing.priceMax)}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-2xl mr-4">👥</div>
              <div className="flex-1">
                <div className="text-sm text-text-secondary">Für</div>
                <div className="font-medium text-text-primary">
                  {event.orientations.includes('hetero') && event.orientations.includes('gay') 
                    ? 'Alle Orientierungen' 
                    : event.orientations.join(', ')}
                </div>
              </div>
            </div>

            {event.dressCode && (
              <div className="flex items-center">
                <div className="text-2xl mr-4">👗</div>
                <div className="flex-1">
                  <div className="text-sm text-text-secondary">Dress Code</div>
                  <div className="font-medium text-text-primary">{event.dressCode}</div>
                </div>
              </div>
            )}

            {event.ageRestriction && (
              <div className="flex items-center">
                <div className="text-2xl mr-4">🔞</div>
                <div className="flex-1">
                  <div className="text-sm text-text-secondary">Altersbeschränkung</div>
                  <div className="font-medium text-text-primary">{event.ageRestriction}+ Jahre</div>
                </div>
              </div>
            )}

            {event.capacity && (
              <div className="flex items-center">
                <div className="text-2xl mr-4">📊</div>
                <div className="flex-1">
                  <div className="text-sm text-text-secondary">Kapazität</div>
                  <div className="font-medium text-text-primary">
                    {event.capacity.current} / {event.capacity.max} Personen
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Kinks/Categories */}
        {event.kinks.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-3">Kategorien</h3>
            <div className="flex flex-wrap gap-2">
              {event.kinks.map((kink) => (
                <span 
                  key={kink}
                  className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{kink}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Stats */}
        <Card className="p-4">
          <h3 className="font-semibold text-text-primary mb-3">Interesse</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-tertiary p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-text-primary">{event.stats.interestedCount}</div>
              <div className="text-sm text-text-secondary">Interessiert</div>
            </div>
            <div className="bg-background-tertiary p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-text-primary">{event.stats.viewCount}</div>
              <div className="text-sm text-text-secondary">Aufrufe</div>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <div className="pt-4">
          <Button 
            className="w-full h-12 text-lg font-semibold"
            variant="primary"
            onClick={() => router.push(`/venue/${event.venue.slug}`)}
          >
            Zur Venue
          </Button>
        </div>
      </div>
    </div>
  );
}