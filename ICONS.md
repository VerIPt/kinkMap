# 📋 Icon-Übersicht KinkMap Frontend

## 🎯 Icon-System Übersicht

Das KinkMap Frontend verwendet ein **hybrides Icon-System** mit drei verschiedenen Ansätzen:

1. **Custom SVG Icons** - Für spezielle Kategorie-Icons
2. **Lucide React Icons** - Für UI-Features und Details
3. **Inline SVG Icons** - Für einfache geometrische Formen

---

## 🏗️ Custom SVG Icons (Kategorie-spezifisch)

### Verwendung
Über die `<Icon>` Komponente in `/components/ui/icon.tsx`

### Verfügbare Icons
Alle Icons befinden sich in `/public/images/icons/`

| Icon Name | Datei | Verwendung |
|-----------|-------|------------|
| `standort-pin` | `/images/icons/standort-pin.svg` | Location-Marker, Venues Tab |
| `kino` | `/images/icons/kino.svg` | Pornokinos Kategorie |
| `bar` | `/images/icons/bar.svg` | Bars Kategorie |
| `sexshop` | `/images/icons/sexshop.svg` | Sexshops Kategorie |
| `swingerclub` | `/images/icons/swingerclub.svg` | Swingerclubs Kategorie |
| `bdsm` | `/images/icons/bdsm.svg` | BDSM/Fetisch Kategorien |
| `club` | `/images/icons/club.svg` | Clubs Kategorie |
| `community` | `/images/icons/community.svg` | Community Spaces |
| `sauna` | `/images/icons/sauna.svg` | Saunas Kategorie |
| `theater` | `/images/icons/theater.svg` | Adult Theaters |
| `karten` | `/images/icons/karten.svg` | Events Tab, Karte Tab |
| `herz` | `/images/icons/herz.svg` | Favoriten, Bewertungen |
| `mask` | `/images/icons/mask.svg` | Events Tab |
| `haus` | `/images/icons/haus.svg` | Private Experiences |
| `bademantel` | `/images/icons/bademantel.svg` | Lockers/Umkleiden |
| `verknupfung` | `/images/icons/verknupfung.svg` | Links/Verbindungen |
| `disco` | `/images/icons/disco.svg` | Disco/Nightclub |
| `gag` | `/images/icons/gag.svg` | BDSM Accessories |
| `halsband` | `/images/icons/halsband.svg` | BDSM Accessories |
| `harnish` | `/images/icons/harnish.svg` | BDSM Accessories |
| `kuss` | `/images/icons/kuss.svg` | Romance/Dating |
| `mandeln` | `/images/icons/mandeln.svg` | Food/Snacks |
| `stift` | `/images/icons/stift.svg` | Writing/Notes |

### Beispiel-Verwendung
```tsx
<Icon name="sexshop" size={24} color="#d32f2f" />
```

---

## 🎨 Lucide React Icons (UI-Features)

### Installation
```bash
npm install lucide-react
```

### Feature-Icons in Venue Details

| Icon | Import | Verwendung | Kontext |
|------|--------|------------|---------|
| `<Car>` | `lucide-react` | 🚗 Parkplatz | Venue Features |
| `<Accessibility>` | `lucide-react` | ♿ Barrierefrei | Venue Features |
| `<Lock>` | `lucide-react` | 🔒 Schließfächer | Venue Features |
| `<Globe>` | `lucide-react` | 🌐 Website | Kontakt |
| `<Instagram>` | `lucide-react` | 📱 Instagram | Kontakt |

### Detail-Icons in Event Details

| Icon | Import | Verwendung | Kontext |
|------|--------|------------|---------|
| `<DollarSign>` | `lucide-react` | 💰 Eintritt/Preise | Event Details |
| `<Users>` | `lucide-react` | 👥 Personen/Kapazität | Event Details |
| `<Shirt>` | `lucide-react` | 👕 Dress Code | Event Details |
| `<Calendar>` | `lucide-react` | 📅 Alter | Event Details |

### Beispiel-Verwendung
```tsx
import { Car, Accessibility, Lock } from 'lucide-react';

<Car size={14} />
<Accessibility size={14} />
<DollarSign size={24} className="text-primary" />
```

---

## ⚡ Inline SVG Icons (UI-Elemente)

### Verwendung
Direkt als React-Komponenten in `/components/ui/icon.tsx`

| Icon Name | Verwendung | SVG |
|-----------|------------|-----|
| `close` | X-Button zum Schließen | ❌ |
| `check` | Checkmark für Bestätigungen | ✅ |
| `star-filled` | Gefüllter Stern für Bewertungen | ⭐ |
| `star-empty` | Leerer Stern für Bewertungen | ☆ |
| `parking` | Parking-Symbol (P) | 🅿️ |
| `accessibility` | Barrierefreiheit-Symbol | ♿ |
| `website` | Globe für Website | 🌐 |
| `instagram` | Instagram-Logo | 📱 |
| `money` | Dollar-Symbol | 💲 |
| `people` | Mehrere Personen | 👥 |
| `time` | Uhr-Symbol | 🕐 |

---

## 🗺️ Icon-Mapping für verschiedene Bereiche

### 1. Hauptnavigation (Tabs)
```tsx
const TABS = [
  { id: 'events', label: 'Events', icon: 'mask' },
  { id: 'venues', label: 'Venues', icon: 'standort-pin' },
  { id: 'map', label: 'Karte', icon: 'karten' },
];
```

### 2. Onboarding-Kategorien
```tsx
const CATEGORIES = [
  { id: 'explore', label: 'Erkunden & Shoppen', icon: 'sexshop' },
  { id: 'nightlife', label: 'Nightlife & Events', icon: 'mask' },
  { id: 'private', label: 'Private Experiences', icon: 'haus' },
  { id: 'community', label: 'Community Spaces', icon: 'community' },
];
```

### 3. Venue-Kategorien
```tsx
const categoryIconMap = {
  'pornokinos': 'kino',
  'bars': 'bar',
  'sexshops': 'sexshop',
  'swingerclubs': 'swingerclub',
  'fetischclubs': 'bdsm',
  'clubs': 'club',
  'gloryholes': 'community',
  'bdsm-studios': 'bdsm',
  'saunas': 'sauna',
  'dungeons': 'bdsm',
  'adult-theaters': 'theater'
};
```

### 4. Event-Type Mapping
```tsx
const eventIconMap = {
  'party': 'club',
  'workshop': 'community',
  'meetup': 'community',
  'private': 'haus',
  'show': 'theater',
  'social': 'community',
  'session': 'bdsm',
  'screening': 'kino',
  'cultural': 'theater',
  'exclusive': 'herz',
  'cruising': 'community'
};
```

---

## 🎭 Icon-Implementierung Details

### Custom Icon Komponente
```tsx
// Verwendung mit Custom SVGs
<Icon name="sexshop" size={24} color="#d32f2f" />

// Verwendung mit Inline SVGs
<Icon name="star-filled" size={16} color="#ffd700" />
```

### Lucide Icons
```tsx
// Import
import { Car, Users, Calendar } from 'lucide-react';

// Verwendung
<Car size={14} />
<Users size={24} className="text-primary" />
```

### Styling
- **Größen**: 14px (klein), 16px (medium), 24px (groß)
- **Farben**: `text-primary`, `text-success`, eigene Hex-Codes
- **Responsive**: Icons passen sich automatisch an

---

## 📁 Dateistruktur

```
/public/images/icons/
├── standort-pin.svg
├── kino.svg
├── bar.svg
├── sexshop.svg
├── swingerclub.svg
├── bdsm.svg
├── club.svg
├── community.svg
├── sauna.svg
├── theater.svg
├── karten.svg
├── herz.svg
├── mask.svg
├── haus.svg
├── bademantel.svg
├── verknupfung.svg
├── disco.svg
├── gag.svg
├── halsband.svg
├── harnish.svg
├── kuss.svg
├── mandeln.svg
└── stift.svg

/src/components/ui/
└── icon.tsx (Icon-Komponente)
```

---

## ✅ Vorteile des aktuellen Systems

1. **Flexibilität**: Custom SVGs für spezielle Kategorien
2. **Konsistenz**: Lucide Icons für Standard-UI-Elemente
3. **Performance**: Nur benötigte Icons werden geladen
4. **Skalierbarkeit**: Einfach neue Icons hinzufügbar
5. **Wartbarkeit**: Zentrale Icon-Verwaltung
6. **Design-Konsistenz**: Einheitliche Lucide-Icons für Features

---

## 🔄 Migration von Emojis zu Icons

**Vorher (Emojis):**
- 🅿️ Parkplatz
- ♿ Barrierefrei
- 💰 Eintritt
- 🕐 Zeit (verwirrend für Alter)

**Nachher (Lucide Icons):**
- `<Car>` Parkplatz
- `<Accessibility>` Barrierefrei
- `<DollarSign>` Eintritt
- `<Calendar>` Alter (semantisch korrekt)