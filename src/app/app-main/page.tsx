'use client';
import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { TabBar } from '@/components/layout/tab-bar';
import { FilterModal, FilterState } from '@/components/layout/filter-modal';
import { EventList } from '@/components/event/event-list';
import { VenueList } from '@/components/venue/venue-list';
import { MapContainer } from '@/components/map/map-container';
import { MOCK_EVENTS, MOCK_VENUES } from '@/lib/mock-data';

const TABS = [
  { id: 'events', label: 'Events', icon: '🎉' },
  { id: 'venues', label: 'Venues', icon: '📍' },
  { id: 'map', label: 'Karte', icon: '🗺️' },
];

export default function MainApp() {
  const [activeTab, setActiveTab] = useState('events');
  const [searchValue, setSearchValue] = useState('');
  const [isGuest] = useState(true); // Simulate guest mode
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    distance: 10,
    orientations: ['hetero', 'gay', 'bdsm'],
    minRating: 0,
    isOpenNow: false,
    hasEventsToday: false,
  });

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'events': return 'Events suchen...';
      case 'venues': return 'Venues suchen...';
      case 'map': return 'In der Nähe suchen...';
      default: return 'Suchen...';
    }
  };

  const handleFilterApply = (newFilters: FilterState) => {
    setFilters(newFilters);
    // TODO: Apply filters to data
    console.log('Applied filters:', newFilters);
  };

  // Filter data based on current filters
  const filteredVenues = MOCK_VENUES.filter(venue => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(venue.category.id)) {
      return false;
    }
    
    // Rating filter
    if (filters.minRating > 0 && venue.rating.avg < filters.minRating) {
      return false;
    }
    
    // Distance filter
    if (venue.distance && venue.distance > filters.distance) {
      return false;
    }
    
    return true;
  });

  const filteredEvents = MOCK_EVENTS.filter(event => {
    // Category filter (based on venue category)
    if (filters.categories.length > 0 && !filters.categories.includes(event.venue.category.id)) {
      return false;
    }
    
    // Events today filter
    if (filters.hasEventsToday) {
      const today = new Date().toDateString();
      if (event.timing.startsAt.toDateString() !== today) {
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

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
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

      {/* Header with Search */}
      <Header
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
        onApplyFilters={handleFilterApply}
      />
    </div>
  );
}