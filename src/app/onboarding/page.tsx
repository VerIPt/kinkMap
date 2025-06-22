'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OnboardingLocation() {
  const [location, setLocation] = useState('');

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

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-sm mx-auto">
          <h1 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Wo bist du?
          </h1>
          
          {/* Location Input */}
          <Input
            placeholder="Stadt oder Postleitzahl"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mb-4"
          />
          
          {/* Current Location Option */}
          <div className="flex items-center p-4 bg-background-tertiary rounded-xl mb-8 cursor-pointer hover:bg-background-secondary transition-colors">
            <div className="w-6 h-6 bg-accent rounded-full mr-4 flex items-center justify-center">
              📍
            </div>
            <div>
              <div className="font-semibold text-text-primary">Aktueller Standort</div>
              <div className="text-sm text-text-secondary">Berlin, Deutschland</div>
            </div>
          </div>
          
          <Button 
            className="w-full h-12 text-lg font-semibold"
            variant="primary"
            onClick={() => window.location.href = '/onboarding/interests'}
          >
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
}