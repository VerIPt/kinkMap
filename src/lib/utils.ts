import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatPrice(min?: number, max?: number): string {
  if (!min && !max) return 'Preis auf Anfrage';
  if (min && max && min !== max) return `${min}€ - ${max}€`;
  if (min) return `${min}€`;
  if (max) return `bis ${max}€`;
  return 'Kostenlos';
}

export function formatDistance(distance?: number): string {
  if (!distance) return '';
  if (distance < 1) return `${Math.round(distance * 1000)}m`;
  return `${distance.toFixed(1)}km`;
}

export function getStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
}

export function isEventToday(eventDate: Date): boolean {
  const today = new Date();
  return eventDate.toDateString() === today.toDateString();
}

export function isVenueOpen(openingHours: { [day: string]: string }): boolean {
  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[now.getDay()];
  const currentHour = now.getHours();
  
  const todayHours = openingHours[dayName];
  if (!todayHours || todayHours === 'closed') return false;
  
  const [open, close] = todayHours.split('-').map(time => {
    const [hour] = time.split(':').map(Number);
    return hour;
  });
  
  if (close < open) { // crosses midnight
    return currentHour >= open || currentHour < close;
  }
  
  return currentHour >= open && currentHour < close;
}