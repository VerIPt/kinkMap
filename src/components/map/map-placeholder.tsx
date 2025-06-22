import React from 'react';
import { Card } from '@/components/ui/card';

export function MapPlaceholder() {
  return (
    <div className="p-4 h-full">
      <Card className="h-full bg-background-tertiary border-border flex items-center justify-center">
        <div className="text-center text-text-secondary">
          <div className="text-4xl mb-4">🗺️</div>
          <div className="font-medium mb-2">Interactive Map</div>
          <div className="text-sm">Karte wird geladen...</div>
        </div>
      </Card>
    </div>
  );
}