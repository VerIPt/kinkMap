'use client';
import React, { useEffect, useRef } from 'react';
import { MOCK_VENUES } from '@/lib/mock-data';
import { Venue } from '@/lib/types';

interface MapContainerProps {
  venues?: Venue[];
  center?: [number, number];
  zoom?: number;
}

export function MapContainer({ 
  venues = MOCK_VENUES, 
  center = [52.5200, 13.4050], // Berlin center
  zoom = 12 
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet only on client side
    const initializeMap = async () => {
      if (!mapRef.current || mapInstanceRef.current || typeof window === 'undefined') return;

      const L = await import('leaflet');
      
      // Fix für Leaflet Icons in Next.js
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Karte initialisieren
      const map = L.map(mapRef.current).setView(center, zoom);

      // OpenStreetMap Tiles hinzufügen
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Custom Icon für Venues erstellen
      const createVenueIcon = (category: string) => {
        const iconEmojis: { [key: string]: string } = {
          'clubs': '🎪',
          'bars': '🍸',
          'shops': '🛍️',
          'cinemas': '🎬',
          'saunas': '🧖‍♂️',
          'studios': '🏠'
        };

        return L.divIcon({
          html: `<div style="
            background: #d32f2f;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">${iconEmojis[category] || '📍'}</div>`,
          className: 'custom-venue-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });
      };

      // Venue-Marker hinzufügen
      venues.forEach((venue) => {
        const marker = L.marker([venue.location.lat, venue.location.lng], {
          icon: createVenueIcon(venue.category.name)
        }).addTo(map);

        // Popup mit Venue-Informationen
        marker.bindPopup(`
          <div style="font-family: system-ui; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #d32f2f; font-size: 16px;">${venue.name}</h3>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${venue.category.displayName}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #888;">
              <span>${venue.rating.avg} ⭐ (${venue.rating.count})</span>
              <span>${venue.distance}km</span>
            </div>
            <button onclick="window.location.href='/venue/${venue.slug}'" 
                    style="
                      width: 100%;
                      background: #d32f2f;
                      color: white;
                      border: none;
                      padding: 8px;
                      border-radius: 6px;
                      margin-top: 8px;
                      cursor: pointer;
                      font-size: 14px;
                    ">
              Details ansehen
            </button>
          </div>
        `);
      });

      mapInstanceRef.current = map;
    };

    initializeMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [venues, center, zoom]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px] rounded-lg"
        style={{ background: '#f0f0f0' }}
      />
    </>
  );
}