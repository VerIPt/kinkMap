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
        className="w-10 h-10 rounded-full p-0"
      >
        ⚙
      </Button>
    </div>
  );
}