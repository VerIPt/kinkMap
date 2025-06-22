'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MOCK_VENUES, MOCK_EVENTS } from '@/lib/mock-data';
import { Venue, Event } from '@/lib/types';

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
  const markersRef = useRef<L.Marker[]>([]);
  const [showEvents, setShowEvents] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Marker löschen
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(marker);
      }
    });
    markersRef.current = [];
  }, []);

  // Marker hinzufügen
  const addMarkers = useCallback(async () => {
    if (!mapInstanceRef.current) return;

    const L = await import('leaflet');
    clearMarkers();

    let dataToShow: Venue[];
    let eventsData: Event[] = [];

    if (showEvents) {
      // Event-Modus: Nur Venues mit Events zeigen
      eventsData = MOCK_EVENTS;
      const venueIdsWithEvents = new Set(eventsData.map(event => event.venue.id));
      dataToShow = venues.filter(venue => venueIdsWithEvents.has(venue.id));
    } else {
      // Venue-Modus: Alle Venues zeigen
      dataToShow = venues;
    }

    console.log('Adding markers for:', dataToShow.length, 'venues, showEvents:', showEvents);

    dataToShow.forEach((venue) => {
      const venueEvents = showEvents ? eventsData.filter(e => e.venue.id === venue.id) : [];
      
      const createIcon = () => {
        if (showEvents) {
          // Event-Icon (rötlicher mit Event-Symbol)
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
              font-size: 18px;
              border: 3px solid #ff6b6b;
              box-shadow: 0 2px 8px rgba(0,0,0,0.4);
              position: relative;
            ">🎉<div style="
              position: absolute;
              top: -5px;
              right: -5px;
              background: #ff6b6b;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              font-size: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">${venueEvents.length}</div></div>`,
            className: 'custom-event-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
        } else {
          // Standard Venue-Icon
          const iconEmojis: { [key: string]: string } = {
            'pornokinos': '🎬',
            'bars': '🍸',
            'sexshops': '🛍️',
            'swingerclubs': '💑',
            'fetischclubs': '🎭',
            'clubs': '🎪',
            'gloryholes': '🕳️',
            'bdsm-studios': '🏠',
            'saunas': '🧖‍♂️',
            'dungeons': '⛓️',
            'adult-theaters': '🎭'
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
            ">${iconEmojis[venue.category.name] || '📍'}</div>`,
            className: 'custom-venue-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
        }
      };

      const marker = L.marker([venue.location.lat, venue.location.lng], {
        icon: createIcon()
      });

      // TypeScript-sicherer Zugriff
      if (mapInstanceRef.current) {
        marker.addTo(mapInstanceRef.current);
      }

      // Popup-Inhalt je nach Modus
      const popupContent = showEvents ? 
        // Event-Popup
        `<div style="font-family: system-ui; min-width: 250px; max-width: 300px;">
          <h3 style="margin: 0 0 8px 0; color: #d32f2f; font-size: 16px;">${venue.name}</h3>
          <p style="margin: 0 0 12px 0; color: #666; font-size: 14px;">${venue.category.displayName}</p>
          <div style="background: #f5f5f5; padding: 8px; border-radius: 6px; margin-bottom: 8px;">
            <strong style="color: #d32f2f; font-size: 14px;">Events (${venueEvents.length}):</strong>
            ${venueEvents.map(event => `
              <div style="margin-top: 6px; padding: 6px; background: white; border-radius: 4px; border-left: 3px solid #d32f2f;">
                <div style="font-weight: 600; font-size: 13px;">${event.title}</div>
                <div style="font-size: 12px; color: #666;">${event.timing.startsAt.toLocaleDateString('de-DE')} um ${event.timing.startsAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr</div>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #888; margin-bottom: 8px;">
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
                    cursor: pointer;
                    font-size: 14px;
                  ">
            Venue Details
          </button>
        </div>` :
        // Standard Venue-Popup
        `<div style="font-family: system-ui; min-width: 200px;">
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
        </div>`;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });
  }, [showEvents, venues, clearMarkers]);

  // Map initialisieren
  useEffect(() => {
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

      mapInstanceRef.current = map;

      // Initial markers hinzufügen
      addMarkers();
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        clearMarkers();
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, addMarkers, clearMarkers]);

  // Marker aktualisieren wenn Modus wechselt
  useEffect(() => {
    if (mapInstanceRef.current) {
      addMarkers();
    }
  }, [addMarkers]);

  const allEventCount = MOCK_EVENTS.length;
  const venuesWithEventsCount = venues.filter(venue => 
    MOCK_EVENTS.some(event => event.venue.id === venue.id)
  ).length;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      
      {/* Switch-Kontrolle */}
      <div className="relative">
        {/* Desktop Switch */}
        <div className="hidden md:block absolute top-4 left-4 z-[1000] bg-gray-900 text-white rounded-lg shadow-lg p-3 border border-gray-700">
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${!showEvents ? 'text-white' : 'text-gray-400'}`}>
              Alle Venues ({venues.length})
            </span>
            <button
              onClick={() => setShowEvents(!showEvents)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                showEvents ? 'bg-red-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showEvents ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${showEvents ? 'text-white' : 'text-gray-400'}`}>
              Alle Events ({allEventCount})
            </span>
          </div>
          
          {showEvents && (
            <div className="mt-2 text-xs text-gray-400">
              {venuesWithEventsCount} Venues mit Events
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden absolute top-4 left-4 z-[1000]">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <span className="text-sm font-medium">
              {showEvents ? `Events (${allEventCount})` : `Venues (${venues.length})`}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${showMobileMenu ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {showMobileMenu && (
            <div className="absolute top-full left-0 mt-2 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 p-3 min-w-[200px]">
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowEvents(false);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left p-2 rounded transition-colors ${
                    !showEvents 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Alle Venues</span>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {venues.length}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Alle Locations anzeigen
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowEvents(true);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left p-2 rounded transition-colors ${
                    showEvents 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Alle Events</span>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {allEventCount}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {venuesWithEventsCount} Venues mit Events
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        <div 
          ref={mapRef} 
          className="w-full h-full min-h-[400px] rounded-lg"
          style={{ background: '#f0f0f0' }}
        />
      </div>
    </>
  );
}