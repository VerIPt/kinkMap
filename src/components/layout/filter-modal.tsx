'use client';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon, StarRating } from '@/components/ui/icon';
import { VENUE_CATEGORIES, MOCK_VENUES } from '@/lib/mock-data';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  distance: number;
  orientations: string[];
  minRating: number;
  isOpenNow: boolean;
  hasEventsToday: boolean;
}

const ORIENTATIONS = [
  { id: 'hetero', label: 'Hetero' },
  { id: 'gay', label: 'Gay/Lesbian' },
  { id: 'trans', label: 'Trans/Queer' },
  { id: 'bdsm', label: 'BDSM/Kink' },
];

export function FilterModal({ isOpen, onClose, onApplyFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    distance: 10,
    orientations: ['hetero', 'gay', 'bdsm'],
    minRating: 0,
    isOpenNow: false,
    hasEventsToday: false,
  });

  // Berechne gefilterte Anzahl
  const filteredCount = useMemo(() => {
    return MOCK_VENUES.filter(venue => {
      // Kategorie-Filter
      if (filters.categories.length > 0 && !filters.categories.includes(venue.category.id)) {
        return false;
      }
      
      // Entfernung-Filter (nur prüfen wenn distance vorhanden)
      if (venue.distance && venue.distance > filters.distance) {
        return false;
      }
      
      // Rating-Filter
      if (venue.rating.avg < filters.minRating) {
        return false;
      }
      
      // Orientierung-Filter (vereinfacht - prüft ob mindestens eine Übereinstimmung)
      if (filters.orientations.length > 0) {
        const hasMatchingOrientation = venue.orientations.some(orientation => 
          filters.orientations.includes(orientation)
        );
        if (!hasMatchingOrientation) {
          return false;
        }
      }
      
      return true;
    }).length;
  }, [filters]);

  if (!isOpen) return null;

  const handleCategoryToggle = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleOrientationToggle = (orientationId: string) => {
    setFilters(prev => ({
      ...prev,
      orientations: prev.orientations.includes(orientationId)
        ? prev.orientations.filter(id => id !== orientationId)
        : [...prev.orientations, orientationId]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      categories: [],
      distance: 10,
      orientations: ['hetero', 'gay', 'bdsm'],
      minRating: 0,
      isOpenNow: false,
      hasEventsToday: false,
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-background-primary flex flex-col">
        {/* Status Bar */}
        <div className="flex justify-between items-center p-4 text-sm text-text-secondary flex-shrink-0">
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

        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 bg-background-secondary border-b border-border flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-primary">
            <Icon name="close" size={20} color="#d32f2f" />
          </Button>
          <h2 className="text-lg font-semibold text-text-primary">Filter</h2>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-primary">
            Reset
          </Button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ touchAction: 'pan-y' }}>
          <div className="p-6 space-y-6">
            {/* Categories */}
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-4">Kategorien</h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto overscroll-contain" style={{ touchAction: 'pan-y' }}>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, categories: [] }))}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.categories.length === 0
                      ? 'bg-primary text-white'
                      : 'bg-background-tertiary text-text-secondary border border-border hover:border-border-light'
                  }`}
                >
                  Alle
                </button>
                {VENUE_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.categories.includes(category.id)
                        ? 'bg-primary text-white'
                        : 'bg-background-tertiary text-text-secondary border border-border hover:border-border-light'
                    }`}
                  >
                    {category.displayName}
                  </button>
                ))}
              </div>
            </Card>

            {/* Distance */}
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-4">Entfernung</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={filters.distance}
                  onChange={(e) => setFilters(prev => ({ ...prev, distance: Number(e.target.value) }))}
                  className="w-full h-2 bg-background-tertiary rounded-lg appearance-none slider"
                />
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>1 km</span>
                  <span className="text-primary font-semibold">{filters.distance} km</span>
                  <span>50+ km</span>
                </div>
              </div>
            </Card>

            {/* Orientations */}
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-4">Orientierung</h3>
              <div className="space-y-3">
                {ORIENTATIONS.map((orientation) => (
                  <label key={orientation.id} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.orientations.includes(orientation.id)}
                      onChange={() => handleOrientationToggle(orientation.id)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                      filters.orientations.includes(orientation.id)
                        ? 'bg-primary border-primary text-white'
                        : 'border-border'
                    }`}>
                      {filters.orientations.includes(orientation.id) && (
                        <Icon name="check" size={12} color="white" />
                      )}
                    </div>
                    <span className="text-text-primary">{orientation.label}</span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Rating */}
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-4">Bewertung</h3>
              <div className="flex gap-2">
                {[0, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      filters.minRating === rating
                        ? 'bg-primary text-white'
                        : 'bg-background-tertiary text-text-secondary border border-border hover:border-border-light'
                    }`}
                  >
                    {rating === 0 ? (
                      'Alle'
                    ) : (
                      <>
                        {rating}+ <StarRating rating={1} maxStars={1} size={14} color={filters.minRating === rating ? "#ffffff" : "#feca57"} />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Availability */}
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-4">Verfügbarkeit</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.isOpenNow}
                    onChange={(e) => setFilters(prev => ({ ...prev, isOpenNow: e.target.checked }))}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                    filters.isOpenNow
                      ? 'bg-primary border-primary text-white'
                      : 'border-border'
                  }`}>
                    {filters.isOpenNow && (
                      <Icon name="check" size={12} color="white" />
                    )}
                  </div>
                  <span className="text-text-primary">Jetzt geöffnet</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasEventsToday}
                    onChange={(e) => setFilters(prev => ({ ...prev, hasEventsToday: e.target.checked }))}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                    filters.hasEventsToday
                      ? 'bg-primary border-primary text-white'
                      : 'border-border'
                  }`}>
                    {filters.hasEventsToday && (
                      <Icon name="check" size={12} color="white" />
                    )}
                  </div>
                  <span className="text-text-primary">Events heute</span>
                </label>
              </div>
            </Card>
          </div>
        </div>

        {/* Apply Button */}
        <div className="p-4 bg-background-secondary border-t border-border flex-shrink-0">
          <Button 
            className="w-full h-12 text-lg font-semibold"
            variant="primary"
            onClick={handleApply}
          >
            Ergebnisse anzeigen ({filteredCount})
          </Button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #d32f2f;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #d32f2f;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}