'use client';
import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { SearchHeader } from '@/components/layout/search-header';
import { TabBar } from '@/components/layout/tab-bar';
import { FilterModal, FilterState } from '@/components/layout/filter-modal';
import { EventList } from '@/components/event/event-list';
import { VenueList } from '@/components/venue/venue-list';
import { MapContainer } from '@/components/map/map-container';
import { MOCK_EVENTS, MOCK_VENUES } from '@/lib/mock-data';

const TABS = [
  { id: 'events', label: 'Events', icon: 'mask' },
  { id: 'venues', label: 'Venues', icon: 'standort-pin' },
  { id: 'map', label: 'Karte', icon: 'karten' },
];

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('events');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isGuest, setIsGuest] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    distance: 10,
    orientations: ['hetero', 'gay', 'bdsm'],
    minRating: 0,
    isOpenNow: false,
    hasEventsToday: false,
  });

  // Check login status on component mount
  React.useEffect(() => {
    // Stelle sicher, dass wir im Browser sind
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsGuest(!isLoggedIn);
    }
  }, []);

  // Filter logic
  const filteredVenues = MOCK_VENUES.filter(venue => {
    if (filters.categories.length > 0 && !filters.categories.includes(venue.category.id)) return false;
    if (filters.minRating > 0 && venue.rating.avg < filters.minRating) return false;
    if (venue.distance && venue.distance > filters.distance) return false;
    return true;
  });

  const filteredEvents = MOCK_EVENTS.filter(event => {
    if (filters.categories.length > 0 && !filters.categories.includes(event.venue.category.id)) return false;
    
    if (filters.hasEventsToday) {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const eventDate = event.timing.startsAt.toISOString().split('T')[0];
      if (eventDate !== today) {
        return false;
      }
    }
    
    return true;
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventList events={filteredEvents} isGuest={isGuest} />;
      case 'venues':
        return <VenueList venues={filteredVenues} isGuest={isGuest} />;
      case 'map':
        return (
          <div className="p-4 h-full">
            <MapContainer venues={filteredVenues} />
          </div>
        );
      default:
        return <EventList events={filteredEvents} isGuest={isGuest} />;
    }
  };

  const getResultCount = () => {
    switch (activeTab) {
      case 'events': return filteredEvents.length;
      case 'venues': return filteredVenues.length;
      case 'map': return filteredVenues.length;
      default: return 0;
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'events': return 'Events suchen...';
      case 'venues': return 'Venues suchen...';
      case 'map': return 'Orte suchen...';
      default: return 'Suchen...';
    }
  };

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Header with kinkMap logo and navigation */}
      <Header showHomeButton={false} />

      {/* Search Header */}
      <SearchHeader
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        placeholder={getPlaceholder()}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      {/* Tab Navigation */}
      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Results Counter */}
      {(filters.categories.length > 0 || filters.minRating > 0 || filters.isOpenNow || filters.hasEventsToday) && (
        <div className="px-4 py-2 bg-background-secondary border-b border-border">
          <div className="text-sm text-text-secondary">
            {getResultCount()} Ergebnisse gefunden
            {filters.categories.length > 0 && (
              <span className="ml-2">
                • {filters.categories.length} Kategorie{filters.categories.length !== 1 ? 'n' : ''}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          setIsFilterOpen(false);
        }}
      />
    </div>
  );
}