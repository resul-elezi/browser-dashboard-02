**1. Browser-Umgebungsmonitor**
- Zeige dynamisch die aktuelle Fenstergröße (innerWidth/InnerHeight) und Bildschirmauflösung (screen.width/screen.height) an
- Implementiere eine Echtzeit-Anzeige der Scroll-Position (X/Y) mit Farbveränderung bei Überschreiten bestimmter Thresholds
- Visualisiere den Ladezustand der Seite (DOMContentLoaded, load, beforeunload)

**2. Navigator-Informationen Panel**
- Erstelle eine übersichtliche Darstellung von:
  - Browser-Name und Version
  - Unterstützte Sprachen (navigator.languages)
  - Plattform und Betriebssystem
  - Cookie-Einstellungen und Do-Not-Track Status
  - Verfügbaren Medien-Geräten (mikrophon/kamera)

**3. URL-Analyzer**
- Parse und visualisiere die aktuelle URL in ihre Bestandteile:
  - Protokoll, Hostname, Port
  - Query-Parameter (zerlegt in Key/Value-Paare)
  - Fragment-Identifier
- Baue eine Funktion zum dynamischen Manipulieren der URL ohne Neuladen (History API)

**4. Performance-Tracker**
- Implementiere eine Ladezeit-Messung für:
  - DOMContentLoaded Event
  - Complete Page Load
  - Ressourcen-Ladezeit (Bilder, Scripts)
- Zeichne die Memory-Nutzung (performance.memory) auf und visualisiere sie

**5. Interaktive Steuerungselemente**
- Fenster-Steuerung:
  - Open/Close Child Windows mit Größen- und Positionseinstellung
  - Steuerung des Fullscreen-Modus
  - Programmisches Scrollen zu Elementen
- Dialog-Manager:
  - Custom Implementation von alert/confirm/prompt
  - Modal Windows mit selbstdefinierten Inhalten

**6. Storage-Manager**
- Baue eine Oberfläche zur Interaktion mit:
  - Local Storage (CRUD-Operationen)
  - Session Storage (mit automatischer Ablaufzeit)
  - Cookies (mit Einstellungsoptionen für Pfad/Domain/Expires)

**7. History Visualizer**
- Zeige die aktuelle History-Länge an
- Implementiere eine Navigation durch die History mit Custom Buttons
- Visualisiere den History-State mit Farbcodierung

**8. Device-Orientation Monitor (Optional)**
- Baue einen Tilt-Sensor für mobile Geräte
- Visualisiere Beschleunigungsdaten in Echtzeit
- Zeige Kompassrichtung an (sofern verfügbar)

**9. Netzwerk-Status Anzeige**
- Implementiere Online/Offline-Statuserkennung
- Messen der Download-Geschwindigkeit über Resource Timing API
- Visualisiere Latenz-Zeiten zu verschiedenen Servern

**10. Media Controller**
- Integriere Audio/Video-Steuerung:
  - Lautstärkeregler für Systemaudio
  - Bild-in-Bild Funktionalität
  - Media Session API für Metadaten-Anzeige

**Anforderungen:**
- Alle Daten müssen in Echtzeit aktualisiert werden
- Responsive Design für verschiedene Fenstergrößen
- Fehlerbehandlung für nicht unterstützte Features
- Semantische HTML-Struktur mit zugänglichen Bedienelementen
- Performance-Optimierung bei Event-Listenern
- Cross-Browser Kompatibilitäts-Checks

Diese Aufgabe deckt folgende Window-Objekteigenschaften/-methoden ab:
- Fenstersteuerung (open/close/resize/move)
- Location und History-Objekte
- Navigator-Informationen
- Performance-APIs
- Storage-Mechanismen
- Dialog-Methoden
- Event-Handling (resize/scroll/load/etc.)
- Screen-Informationen
- Timing-Funktionen (setTimeout/Interval)
