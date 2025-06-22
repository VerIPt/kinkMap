import React from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex bg-background-secondary border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 py-3 px-4 text-sm font-medium transition-colors',
            'border-b-2 border-transparent',
            activeTab === tab.id
              ? 'text-primary border-primary bg-primary/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary'
          )}
        >
          <div className="flex items-center justify-center gap-2">
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}