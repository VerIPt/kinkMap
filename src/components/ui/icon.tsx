import React from 'react';
import Image from 'next/image';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  containerColor?: string;
  showContainer?: boolean;
}

const iconMap: { [key: string]: string } = {
  // Close/X
  'close': '/images/icons/verknupfung.svg', // Als Platzhalter, wird durch X ersetzt
  // Check/Checkmark  
  'check': '/images/icons/verknupfung.svg', // Als Platzhalter, wird durch Checkmark ersetzt
  // Star Rating
  'star': '/images/icons/herz.svg', // Herz als Stern-Ersatz
  // Location/Pin
  'location': '/images/icons/standort-pin.svg',
  'standort-pin': '/images/icons/standort-pin.svg',
  // Venue Categories
  'cinema': '/images/icons/kino.svg',
  'bar': '/images/icons/bar.svg',
  'sexshop': '/images/icons/sexshop.svg',
  'swingerclub': '/images/icons/swingerclub.svg',
  'bdsm': '/images/icons/bdsm.svg',
  'club': '/images/icons/club.svg',
  'community': '/images/icons/community.svg',
  'sauna': '/images/icons/sauna.svg',
  'theater': '/images/icons/theater.svg',
  // Event/General
  'event': '/images/icons/karten.svg',
  'karten': '/images/icons/karten.svg',
  'heart': '/images/icons/herz.svg',
  'mask': '/images/icons/mask.svg',
  'house': '/images/icons/haus.svg',
  'haus': '/images/icons/haus.svg',
  // Features
  'parking': '/images/icons/standort-pin.svg', // Als Platzhalter
  'accessibility': '/images/icons/haus.svg', // Als Platzhalter
  'lockers': '/images/icons/bademantel.svg',
  // Contact
  'website': '/images/icons/verknupfung.svg',
  'phone': '/images/icons/verknupfung.svg',
  // Money/Price
  'money': '/images/icons/karten.svg', // Als Platzhalter
  // People/Group
  'people': '/images/icons/community.svg',
  // Dress Code
  'dresscode': '/images/icons/bademantel.svg',
};

// Für Icons die wir als einfache SVGs implementieren (X, Check, etc.)
const SimpleIcons: { [key: string]: React.FC<{ size: number; color: string }> } = {
  'close': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'check': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'star-filled': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  'star-empty': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="1" fill="none"/>
    </svg>
  ),
  'parking': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M8 7h4a3 3 0 0 1 0 6H8V7z" fill="white"/>
      <path d="M8 13h3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'accessibility': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke={color} fill="none" strokeWidth="2"/>
      <path d="M16 11h-8l2-6h4l2 6z" fill="white"/>
    </svg>
  ),
  'website': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  'instagram': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke={color} strokeWidth="2"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke={color} strokeWidth="2"/>
      <path d="M17.5 6.5h.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'money': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'people': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  'time': ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
};

export function Icon({ 
  name, 
  size = 24, 
  color = '#d32f2f', 
  className = '',
  containerColor,
  showContainer = false
}: IconProps) {
  // Für einfache SVG-Icons
  if (SimpleIcons[name]) {
    const SimpleIcon = SimpleIcons[name];
    const iconElement = <SimpleIcon size={size} color={color} />;
    
    if (showContainer && containerColor) {
      return (
        <div 
          className={`inline-flex items-center justify-center rounded-full ${className}`}
          style={{ 
            backgroundColor: containerColor, 
            width: size + 16, 
            height: size + 16 
          }}
        >
          {iconElement}
        </div>
      );
    }
    
    return <div className={className}>{iconElement}</div>;
  }

  // Für externe SVG-Dateien
  const iconPath = iconMap[name];
  if (!iconPath) {
    console.warn(`Icon "${name}" not found`);
    return <div className={className} style={{ width: size, height: size }} />;
  }

  const iconElement = (
    <Image
      src={iconPath}
      alt={name}
      width={size}
      height={size}
      style={{ 
        filter: color !== '#000000' ? `brightness(0) saturate(100%) invert(${color === '#d32f2f' ? '23%' : color === '#ff6b6b' ? '70%' : '20%'}) sepia(${color === '#d32f2f' ? '94%' : color === '#ff6b6b' ? '84%' : '0%'}) saturate(${color === '#d32f2f' ? '7467%' : color === '#ff6b6b' ? '1500%' : '0%'}) hue-rotate(${color === '#d32f2f' ? '354deg' : color === '#ff6b6b' ? '320deg' : '0deg'}) brightness(${color === '#d32f2f' ? '87%' : color === '#ff6b6b' ? '110%' : '42%'}) contrast(117%)` : 'none'
      }}
      className="inline-block"
    />
  );

  if (showContainer && containerColor) {
    return (
      <div 
        className={`inline-flex items-center justify-center rounded-full ${className}`}
        style={{ 
          backgroundColor: containerColor, 
          width: size + 16, 
          height: size + 16 
        }}
      >
        {iconElement}
      </div>
    );
  }

  return <div className={className}>{iconElement}</div>;
}

// Spezielle Komponente für Sterne-Rating
export function StarRating({ rating, maxStars = 5, size = 16, color = '#feca57' }: {
  rating: number;
  maxStars?: number;
  size?: number;
  color?: string;
}) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  // Gefüllte Sterne
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Icon key={`full-${i}`} name="star-filled" size={size} color={color} />
    );
  }

  // Halb gefüllter Stern (hier als leeren Stern darstellen)
  if (hasHalfStar) {
    stars.push(
      <Icon key="half" name="star-empty" size={size} color={color} />
    );
  }

  // Leere Sterne
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon key={`empty-${i}`} name="star-empty" size={size} color={color} />
    );
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
}