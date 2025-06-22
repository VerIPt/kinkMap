'use client';
import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { TabBar } from '@/components/layout/tab-bar';
import { EventList } from '@/components/event/event-list';
import { VenueList } from '@/components/venue/venue-list';
import { MapPlaceholder } from '@/components/map/map-placeholder';
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

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'events': return 'Events suchen...';
      case 'venues': return 'Venues suchen...';
      case 'map': return 'In der Nähe suchen...';
      default: return 'Suchen...';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventList events={MOCK_EVENTS} isGuest={isGuest} />;
      case 'venues':
        return <VenueList venues={MOCK_VENUES} isGuest={isGuest} />;
      case 'map':
        return <MapPlaceholder />;
      default:
        return <EventList events={MOCK_EVENTS} isGuest={isGuest} />;
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
        onFilterClick={() => console.log('Filter clicked')}
      />

      {/* Tab Navigation */}
      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}