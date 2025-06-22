'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  title?: string;
  transparent?: boolean;
  className?: string;
}

export function Header({ 
  showBackButton = false,
  showHomeButton = true,
  title,
  transparent = false,
  className = ''
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/app-main');
  };

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      transparent ? 'bg-transparent' : 'bg-background-secondary/95 backdrop-blur-sm border-b border-border/50'
    } ${className}`}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Side - Back Button */}
        <div className="flex items-center">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="w-9 h-9 rounded-full p-0 mr-2 hover:bg-background-tertiary"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-text-primary"
              >
                <path 
                  d="M19 12H5M12 19L5 12L12 5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
        </div>

        {/* Center - Logo/Title */}
        <div className="flex-1 flex justify-center">
          {title ? (
            <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
          ) : (
            <h1 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
                kinkMap
              </span>
            </h1>
          )}
        </div>

        {/* Right Side - Home Button */}
        <div className="flex items-center">
          {showHomeButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHome}
              className="w-9 h-9 rounded-full p-0 hover:bg-background-tertiary"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-text-primary"
              >
                <path 
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M9 22V12H15V22" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}