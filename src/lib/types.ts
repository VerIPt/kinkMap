// User & Auth Types
export interface User {
  id: string;
  email: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  location?: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  isPremium: boolean;
  preferences: UserPreferences;
}

export interface UserPreferences {
  categories: string[];
  orientations: string[];
  kinks: string[];
  searchRadius: number;
  minRating: number;
}

// Venue Types
export interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: VenueCategory;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    postalCode: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    instagram?: string;
  };
  features: {
    parking?: boolean;
    wheelchair?: boolean;
    lockers?: boolean;
    [key: string]: boolean | undefined;
  };
  orientations: string[];
  kinks: string[];
  ageRestriction?: number;
  dressCode?: string;
  openingHours: {
    [day: string]: string;
  };
  media: {
    logoUrl?: string;
    coverImageUrl?: string;
    images: string[];
  };
  pricing: {
    entryFeeMin?: number;
    entryFeeMax?: number;
    currency: string;
  };
  rating: {
    avg: number;
    count: number;
  };
  subscriptionTier: 'free' | 'basic' | 'standard' | 'premium';
  isFeatured: boolean;
  isVerified: boolean;
  distance?: number;
}

export interface VenueCategory {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  venue: Venue;
  organizer?: User;
  timing: {
    startsAt: Date;
    endsAt?: Date;
    timezone: string;
  };
  eventType: 'party' | 'workshop' | 'meetup' | 'private';
  orientations: string[];
  kinks: string[];
  ageRestriction?: number;
  dressCode?: string;
  capacity?: {
    max: number;
    current: number;
  };
  ticketing: {
    priceMin?: number;
    priceMax?: number;
    currency: string;
    ticketUrl?: string;
    requiresRsvp: boolean;
  };
  media: {
    coverImageUrl?: string;
    images: string[];
  };
  isFeatured: boolean;
  status: 'published' | 'cancelled' | 'postponed';
  stats: {
    viewCount: number;
    interestedCount: number;
  };
}

// Review Types
export interface Review {
  id: string;
  user: {
    id: string;
    displayName: string;
    avatarUrl?: string;
  };
  venue: Venue;
  event?: Event;
  rating: number;
  title?: string;
  content: string;
  detailedRatings?: {
    [category: string]: number;
  };
  helpfulCount: number;
  createdAt: Date;
  isApproved: boolean;
}

// Filter Types
export interface SearchFilters {
  query?: string;
  location?: {
    lat: number;
    lng: number;
    radius: number; // in km
  };
  categories?: string[];
  orientations?: string[];
  kinks?: string[];
  minRating?: number;
  isOpenNow?: boolean;
  hasEventsToday?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchResponse<T> extends PaginatedResponse<T> {
  filters: SearchFilters;
  suggestions?: string[];
}