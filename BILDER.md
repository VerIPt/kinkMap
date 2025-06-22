# KinkMap Frontend - Bilder hinzufügen

## Bildverzeichnisse

Das Projekt unterstützt Bilder in folgenden Verzeichnissen:

```
public/
  images/
    venues/          # Venue-Bilder und Logos
    events/          # Event-Cover-Bilder  
    icons/           # Icons und allgemeine Bilder
```

## Bildunterstützung

### Venues
- **Logo/Cover**: `venue.media.logoUrl` oder `venue.media.coverImageUrl`
- **Beispielpfade**: 
  - `/images/venues/velvet-dreams-logo.jpg`
  - `/images/venues/dark-desires-cover.jpg`

### Events  
- **Cover-Bilder**: `event.media.coverImageUrl`
- **Beispielpfade**:
  - `/images/events/latex-friday-cover.jpg`
  - `/images/events/pride-warmup-cover.jpg`

## Bildformate
- Unterstützt: JPG, PNG, WebP
- Empfohlene Größen:
  - Venue Logos: 400x400px
  - Venue Cover: 800x400px  
  - Event Cover: 800x600px

## Fallback-Verhalten
- Wenn kein Bild vorhanden: Zeigt Category-Icon (Emoji)
- Wenn Bild lädt nicht: Automatischer Fallback zu Gradient/Icon
- Next.js Image-Optimierung ist aktiviert

## Bilder hinzufügen

1. Bilder in entsprechende Verzeichnisse kopieren
2. Dateinamen in Mock-Daten aktualisieren (`src/lib/mock-data.ts`)
3. Beispiel:

```typescript
{
  id: '1',
  name: 'Velvet Dreams',
  media: {
    logoUrl: '/images/venues/velvet-dreams-logo.jpg',
    coverImageUrl: '/images/venues/velvet-dreams-cover.jpg',
    images: [
      '/images/venues/velvet-dreams-1.jpg',
      '/images/venues/velvet-dreams-2.jpg'
    ]
  }
}
```

Das System ist bereit für deine Bilder! 🎉