'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MOCK_VENUES, MOCK_EVENTS } from '@/lib/mock-data';
import { Venue, Event } from '@/lib/types';
import { Icon } from '@/components/ui/icon';

interface MapContainerProps {
  venues?: Venue[];
  center?: [number, number];
  zoom?: number;
}

// Helper function außerhalb der Komponente
const getCategoryIcon = (categoryName: string): string => {
  const iconMap: { [key: string]: string } = {
    'pornokinos': 'kino',
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
  return iconMap[categoryName] || 'haus';
};

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
  const [isMapLoaded, setIsMapLoaded] = useState(false);

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
      const iconName = getCategoryIcon(venue.category.name);
      
      const createIcon = () => {
        if (showEvents) {
          // Event-Icon (rot mit grauem Container und Event-Anzahl)
          return L.divIcon({
            html: `<div style="
              background: #2a2a2a;
              color: white;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              border: 2px solid #d32f2f;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              position: relative;
            ">
              <img src="/images/icons/${iconName}.svg" 
                   style="width: 20px; height: 20px; filter: brightness(0) saturate(100%) invert(23%) sepia(94%) saturate(7467%) hue-rotate(354deg) brightness(87%) contrast(117%);" />
              <div style="
                position: absolute;
                top: -4px;
                right: -4px;
                background: #d32f2f;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                font-weight: bold;
              ">${venueEvents.length}</div>
            </div>`,
            className: 'custom-event-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
        } else {
          // Standard Venue-Icon (rot ohne Container)
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
            ">
              <img src="/images/icons/${iconName}.svg" 
                   style="width: 20px; height: 20px; filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%);" />
            </div>`,
            className: 'custom-venue-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
        }
      };

      const marker = L.marker([venue.location.lat, venue.location.lng], { 
        icon: createIcon() 
      }).addTo(mapInstanceRef.current!);

      // Popup-Inhalt mit Icons statt Emojis
      const popupContent = `<div style="font-family: system-ui; min-width: 200px;">
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
  }, [venues, showEvents, clearMarkers]);

  // Map initialisieren
  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current || mapInstanceRef.current || typeof window === 'undefined') return;

      try {
        const L = await import('leaflet');
        
        // Leaflet CSS dynamisch laden wenn nicht vorhanden
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
          
          // Warten bis CSS geladen ist
          await new Promise(resolve => {
            link.onload = resolve;
            setTimeout(resolve, 1000); // Fallback
          });
        }
        
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
        setIsMapLoaded(true);

        // Karte invalidieren nach kurzer Verzögerung (wichtig für korrekte Darstellung)
        setTimeout(() => {
          map.invalidateSize();
          addMarkers();
        }, 100);

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        clearMarkers();
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapLoaded(false);
      }
    };
  }, [center, zoom, clearMarkers, addMarkers]);

  // Marker aktualisieren wenn Modus wechselt
  useEffect(() => {
    if (mapInstanceRef.current && isMapLoaded) {
      addMarkers();
    }
  }, [addMarkers, isMapLoaded]);

  // Window resize handler für Karte
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        setTimeout(() => {
          mapInstanceRef.current!.invalidateSize();
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allEventCount = MOCK_EVENTS.length;
  const venuesWithEventsCount = venues.filter(venue => 
    MOCK_EVENTS.some(event => event.venue.id === venue.id)
  ).length;

  return (
    <div className="relative w-full h-full">
      {/* Map Container mit expliziter Größe */}
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px]"
        style={{ 
          width: '100%', 
          height: '100%',
          minHeight: '400px',
          position: 'relative'
        }}
      />
      
      {/* Loading Indicator */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-background-secondary flex items-center justify-center">
          <div className="text-text-secondary">Karte wird geladen...</div>
        </div>
      )}
      
      {/* Controls */}
      <div className="absolute top-4 right-4 z-[1000] bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 p-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
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
            <Icon 
              name="close" 
              size={16} 
              color="white"
              className={`transition-transform ${showMobileMenu ? 'rotate-45' : ''}`}
            />
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
                    Events in Venues anzeigen
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}