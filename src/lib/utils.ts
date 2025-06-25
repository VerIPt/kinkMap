import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatPrice(min?: number, max?: number): string {
  if (!min && !max) return 'Kostenlos';
  if (!min) return `bis ${max}€`;
  if (!max || min === max) return `${min}€`;
  return `${min}-${max}€`;
}

export function formatDistance(distance?: number): string {
  if (!distance) return '';
  return `${distance}km`;
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