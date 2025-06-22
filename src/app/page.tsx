'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12">
        <div className="text-center max-w-sm w-full">
          {/* Logo */}
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
              kinkMap
            </span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl text-text-secondary mb-12 leading-relaxed">
            Entdecke deine Community in Berlin
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4 w-full">
            <Button 
              className="w-full h-12 text-lg font-semibold"
              variant="primary"
              onClick={() => window.location.href = '/onboarding'}
            >
              Registrieren
            </Button>
            
            <Button 
              className="w-full h-12 text-lg font-semibold"
              variant="secondary"
              onClick={() => window.location.href = '/auth/login'}
            >
              Anmelden
            </Button>
            
            <Button 
              className="w-full h-12 text-lg font-semibold"
              variant="ghost"
              onClick={() => window.location.href = '/app-main'}
            >
              Als Gast fortfahren
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="text-center p-6 text-sm text-text-muted">
        Für Erwachsene ab 18 Jahren
      </div>
    </div>
  );
}
