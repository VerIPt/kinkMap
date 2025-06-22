import { Venue, Event, VenueCategory, User, SearchFilters } from './types';

export const VENUE_CATEGORIES: VenueCategory[] = [
  {
    id: '1',
    name: 'clubs',
    displayName: 'Clubs',
    description: 'Fetisch- und Swingerclubs',
    icon: '🎪',
    color: '#d32f2f',
  },
  {
    id: '2',
    name: 'bars',
    displayName: 'Bars & Lounges',
    description: 'LGBTQ+ und Kink-freundliche Bars',
    icon: '🍸',
    color: '#4ecdc4',
  },
  {
    id: '3',
    name: 'shops',
    displayName: 'Shops',
    description: 'Sexshops und Adult Stores',
    icon: '🛍️',
    color: '#45b7d1',
  },
  {
    id: '4',
    name: 'cinemas',
    displayName: 'Pornokinos',
    description: 'Adult Kinos',
    icon: '🎬',
    color: '#96ceb4',
  },
  {
    id: '5',
    name: 'saunas',
    displayName: 'Saunas & Bäder',
    description: 'Saunas und Bathhouses',
    icon: '🧖‍♂️',
    color: '#feca57',
  },
  {
    id: '6',
    name: 'studios',
    displayName: 'Studios',
    description: 'BDSM Studios und private Spaces',
    icon: '🏠',
    color: '#ff9ff3',
  },
];

export const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'Velvet Dreams',
    slug: 'velvet-dreams',
    description: 'Berlins exklusiver Fetischclub in Mitte. Dress Code: Fetisch, Latex, Leder oder stylisch schwarz.',
    category: VENUE_CATEGORIES[0],
    location: {
      lat: 52.5127,
      lng: 13.4116,
      address: 'Friedrichstraße 145',
      city: 'Berlin',
      postalCode: '10117',
    },
    contact: {
      website: 'https://www.velvet-dreams.de',
      instagram: '@velvetdreams_berlin',
    },
    features: {
      parking: false,
      wheelchair: false,
      lockers: true,
    },
    orientations: ['hetero', 'gay', 'lesbian', 'trans', 'queer'],
    kinks: ['bdsm', 'fetish', 'latex', 'leather'],
    ageRestriction: 21,
    dressCode: 'Fetisch, Latex, Leder oder stylisch schwarz. Kein Street Wear!',
    openingHours: {
      thursday: '23:00-06:00',
      friday: '23:00-08:00',
      saturday: '23:00-10:00',
      sunday: 'closed',
      monday: 'closed',
      tuesday: 'closed',
      wednesday: 'closed',
    },
    media: {
      coverImageUrl: '/images/venues/velvet-dreams-cover.jpg',
      images: ['/images/venues/velvet-dreams-1.jpg', '/images/venues/velvet-dreams-2.jpg'],
    },
    pricing: {
      entryFeeMin: 15,
      entryFeeMax: 25,
      currency: 'EUR',
    },
    rating: {
      avg: 4.8,
      count: 124,
    },
    subscriptionTier: 'premium',
    isFeatured: true,
    isVerified: true,
    distance: 1.2,
  },
  {
    id: '2',
    name: 'Rainbow Lounge',
    slug: 'rainbow-lounge',
    description: 'LGBTQ+ Bar in Neukölln mit vielfältigen Events und offener Atmosphäre.',
    category: VENUE_CATEGORIES[1],
    location: {
      lat: 52.4875,
      lng: 13.4342,
      address: 'Weserstraße 34',
      city: 'Berlin',
      postalCode: '12045',
    },
    contact: {
      website: 'https://www.rainbow-lounge-berlin.de',
      instagram: '@rainbow_lounge_neukölln',
    },
    features: {
      parking: true,
      wheelchair: true,
      lockers: true,
    },
    orientations: ['gay', 'lesbian', 'trans', 'queer'],
    kinks: ['vanilla'],
    ageRestriction: 18,
    openingHours: {
      friday: '20:00-03:00',
      saturday: '20:00-04:00',
      sunday: '18:00-01:00',
    },
    media: {
      coverImageUrl: '/images/venues/rainbow-lounge-cover.jpg',
      images: [],
    },
    pricing: {
      entryFeeMin: 5,
      entryFeeMax: 12,
      currency: 'EUR',
    },
    rating: {
      avg: 4.6,
      count: 89,
    },
    subscriptionTier: 'standard',
    isFeatured: false,
    isVerified: true,
    distance: 2.8,
  },
  {
    id: '3',
    name: 'Dark Desires',
    slug: 'dark-desires',
    description: 'Eleganter Fetischclub in Berlin Mitte mit exklusiver Atmosphäre.',
    category: VENUE_CATEGORIES[0],
    location: {
      lat: 52.5200,
      lng: 13.4050,
      address: 'Unter den Linden 88',
      city: 'Berlin',
      postalCode: '10117',
    },
    contact: {
      website: 'https://www.dark-desires.berlin',
      instagram: '@darkdesires_berlin',
    },
    features: {
      parking: true,
      wheelchair: false,
      lockers: true,
    },
    orientations: ['hetero', 'gay', 'lesbian', 'trans', 'queer'],
    kinks: ['bdsm', 'fetish', 'latex', 'leather'],
    ageRestriction: 21,
    dressCode: 'Fetisch, Latex, Leder oder stylisch schwarz',
    openingHours: {
      friday: '22:00-06:00',
      saturday: '22:00-06:00',
    },
    media: {
      coverImageUrl: '/images/venues/dark-desires-cover.jpg',
      images: [],
    },
    pricing: {
      entryFeeMin: 20,
      entryFeeMax: 30,
      currency: 'EUR',
    },
    rating: {
      avg: 4.7,
      count: 67,
    },
    subscriptionTier: 'premium',
    isFeatured: true,
    isVerified: true,
    distance: 0.8,
  },
  {
    id: '4',
    name: 'Crimson Nights',
    slug: 'crimson-nights',
    description: 'Gehobener Swingerclub in Charlottenburg für diskrete Begegnungen.',
    category: VENUE_CATEGORIES[0],
    location: {
      lat: 52.5065,
      lng: 13.3249,
      address: 'Kantstraße 156',
      city: 'Berlin',
      postalCode: '10623',
    },
    contact: {
      website: 'https://www.crimson-nights.de',
      instagram: '@crimsonnights_berlin',
    },
    features: {
      parking: true,
      wheelchair: true,
      lockers: true,
    },
    orientations: ['hetero', 'queer'],
    kinks: ['swinger', 'couples'],
    ageRestriction: 21,
    dressCode: 'Elegant oder sexy, keine Freizeitkleidung',
    openingHours: {
      thursday: '21:00-04:00',
      friday: '21:00-05:00',
      saturday: '21:00-05:00',
    },
    media: {
      coverImageUrl: '/images/venues/crimson-nights-cover.jpg',
      images: [],
    },
    pricing: {
      entryFeeMin: 25,
      entryFeeMax: 45,
      currency: 'EUR',
    },
    rating: {
      avg: 4.5,
      count: 156,
    },
    subscriptionTier: 'premium',
    isFeatured: false,
    isVerified: true,
    distance: 3.2,
  },
  {
    id: '5',
    name: 'Urban Temptations',
    slug: 'urban-temptations',
    description: 'Moderner Adult Store in Prenzlauer Berg mit großer Auswahl.',
    category: VENUE_CATEGORIES[2],
    location: {
      lat: 52.5311,
      lng: 13.4103,
      address: 'Kastanienallee 67',
      city: 'Berlin',
      postalCode: '10119',
    },
    contact: {
      website: 'https://www.urban-temptations.de',
      instagram: '@urban_temptations',
    },
    features: {
      parking: false,
      wheelchair: true,
      lockers: false,
    },
    orientations: ['hetero', 'gay', 'lesbian', 'trans', 'queer'],
    kinks: ['toys', 'lingerie', 'bdsm'],
    ageRestriction: 18,
    openingHours: {
      monday: '11:00-20:00',
      tuesday: '11:00-20:00',
      wednesday: '11:00-20:00',
      thursday: '11:00-20:00',
      friday: '11:00-21:00',
      saturday: '10:00-21:00',
      sunday: '12:00-18:00',
    },
    media: {
      coverImageUrl: '/images/venues/urban-temptations-cover.jpg',
      images: [],
    },
    pricing: {
      entryFeeMin: 0,
      entryFeeMax: 0,
      currency: 'EUR',
    },
    rating: {
      avg: 4.4,
      count: 203,
    },
    subscriptionTier: 'basic',
    isFeatured: false,
    isVerified: true,
    distance: 1.8,
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Latex Friday',
    slug: 'latex-friday-2025-06-21',
    description: 'Jeden Freitag verwandelt sich Velvet Dreams in ein Playground für Fetischisten. Dress Code: Latex, Leder, Fetisch oder stylisch schwarz. No Street Wear!',
    shortDescription: 'Wöchentlicher Fetischclub im Velvet Dreams',
    venue: MOCK_VENUES[0],
    timing: {
      startsAt: new Date('2025-06-21T22:00:00'),
      endsAt: new Date('2025-06-22T06:00:00'),
      timezone: 'Europe/Berlin',
    },
    eventType: 'party',
    orientations: ['hetero', 'gay', 'lesbian', 'trans', 'queer'],
    kinks: ['bdsm', 'fetish', 'latex', 'leather'],
    ageRestriction: 21,
    dressCode: 'Fetisch, Latex, Leder oder stylisch schwarz',
    ticketing: {
      priceMin: 15,
      priceMax: 25,
      currency: 'EUR',
      requiresRsvp: false,
    },
    media: {
      coverImageUrl: '/images/events/latex-friday-cover.jpg',
      images: [],
    },
    isFeatured: true,
    status: 'published',
    stats: {
      viewCount: 234,
      interestedCount: 45,
    },
  },
  {
    id: '2',
    title: 'Pride Warm-Up',
    slug: 'pride-warm-up-2025-06-22',
    description: 'Große Pride Warm-Up Party in der Rainbow Lounge mit DJs, Drag Shows und guter Stimmung.',
    shortDescription: 'Pride Vorfeier in der Rainbow Lounge',
    venue: MOCK_VENUES[1],
    timing: {
      startsAt: new Date('2025-06-22T20:00:00'),
      endsAt: new Date('2025-06-23T04:00:00'),
      timezone: 'Europe/Berlin',
    },
    eventType: 'party',
    orientations: ['gay', 'lesbian', 'trans', 'queer'],
    kinks: ['vanilla'],
    ageRestriction: 18,
    ticketing: {
      priceMin: 8,
      priceMax: 15,
      currency: 'EUR',
      requiresRsvp: false,
    },
    media: {
      coverImageUrl: '/images/events/pride-warmup-cover.jpg',
      images: [],
    },
    isFeatured: false,
    status: 'published',
    stats: {
      viewCount: 156,
      interestedCount: 67,
    },
  },
  {
    id: '3',
    title: 'Dark Carnival',
    slug: 'dark-carnival-2025-06-21',
    description: 'Elegante Gothic-Party im Dark Desires mit striktem Dress Code.',
    shortDescription: 'Gothic Night im Dark Desires',
    venue: MOCK_VENUES[2],
    timing: {
      startsAt: new Date('2025-06-21T22:00:00'),
      endsAt: new Date('2025-06-22T06:00:00'),
      timezone: 'Europe/Berlin',
    },
    eventType: 'party',
    orientations: ['hetero', 'gay', 'lesbian', 'trans', 'queer'],
    kinks: ['gothic', 'fetish'],
    ageRestriction: 21,
    dressCode: 'Gothic, Fetisch oder stilvolles Schwarz',
    ticketing: {
      priceMin: 20,
      priceMax: 30,
      currency: 'EUR',
      requiresRsvp: false,
    },
    media: {
      coverImageUrl: '/images/events/dark-carnival-cover.jpg',
      images: [],
    },
    isFeatured: true,
    status: 'published',
    stats: {
      viewCount: 189,
      interestedCount: 32,
    },
  },
  {
    id: '4',
    title: 'Couples Night',
    slug: 'couples-night-2025-06-22',
    description: 'Exklusiver Abend für Paare im Crimson Nights mit entspannter Atmosphäre.',
    shortDescription: 'Paare-Event im Crimson Nights',
    venue: MOCK_VENUES[3],
    timing: {
      startsAt: new Date('2025-06-22T21:00:00'),
      endsAt: new Date('2025-06-23T05:00:00'),
      timezone: 'Europe/Berlin',
    },
    eventType: 'private',
    orientations: ['hetero', 'queer'],
    kinks: ['swinger', 'couples'],
    ageRestriction: 21,
    dressCode: 'Elegant oder sexy',
    ticketing: {
      priceMin: 40,
      priceMax: 60,
      currency: 'EUR',
      requiresRsvp: true,
    },
    media: {
      coverImageUrl: '/images/events/couples-night-cover.jpg',
      images: [],
    },
    isFeatured: false,
    status: 'published',
    stats: {
      viewCount: 98,
      interestedCount: 23,
    },
  },
];

export const MOCK_USER: User = {
  id: '1',
  email: 'user@example.com',
  username: 'berlinexplorer',
  displayName: 'Berlin Explorer',
  location: {
    lat: 52.5200,
    lng: 13.4050,
    city: 'Berlin',
    country: 'DE',
  },
  isPremium: false,
  preferences: {
    categories: ['clubs', 'bars'],
    orientations: ['hetero', 'queer'],
    kinks: ['bdsm', 'fetish'],
    searchRadius: 10,
    minRating: 4.0,
  },
};

// Utility functions for mock data
export const getVenuesByCategory = (categoryName: string): Venue[] => {
  return MOCK_VENUES.filter(venue => venue.category.name === categoryName);
};

export const getUpcomingEvents = (limit?: number): Event[] => {
  const now = new Date();
  const upcoming = MOCK_EVENTS
    .filter(event => event.timing.startsAt > now)
    .sort((a, b) => a.timing.startsAt.getTime() - b.timing.startsAt.getTime());
  
  return limit ? upcoming.slice(0, limit) : upcoming;
};

export const searchVenues = (query: string, filters?: Partial<SearchFilters>): Venue[] => {
  let results = MOCK_VENUES;
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    results = results.filter(venue => 
      venue.name.toLowerCase().includes(lowercaseQuery) ||
      venue.description.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  if (filters?.categories?.length) {
    results = results.filter(venue => 
      filters.categories!.includes(venue.category.name)
    );
  }
  
  if (filters?.minRating) {
    results = results.filter(venue => venue.rating.avg >= filters.minRating!);
  }
  
  return results;
};