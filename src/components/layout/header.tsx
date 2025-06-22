import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onFilterClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
}

export function Header({ 
  onFilterClick, 
  searchValue = '', 
  onSearchChange,
  placeholder = 'Suchen...'
}: HeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-background-secondary border-b border-border">
      <Input
        variant="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        className="flex-1"
      />
      <Button
        variant="primary"
        size="sm"
        onClick={onFilterClick}
        className="w-10 h-10 rounded-full p-0 flex items-center justify-center hover:bg-primary-600 transition-colors"
        title="Filter öffnen"
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path 
            d="M3 7H21L16 12V19L8 15V12L3 7Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
}