# Blog Architektur Konzept (Astro + Notion)

Dieses Dokument hält die geplante Architektur für das zukünftige Blog- / Magazin-Modul fest.

## 1. Die Datenbank in Notion
Anstatt die vorhandene Übersetzungs-Datenbank ("Static Pages DB") zu verwenden, wird eine **neue, komplett separate Notion-Datenbank** angelegt.
Diese Struktur ist notwendig, um SEO-optimierte Inhalte und das regelmäßige "Drip-Feed"-Publishing zu unterstützen.

**Wichtige Spalten (Eigenschaften) für die neue Datenbank:**
*   `Titel`: Der H1-Titel des Blogposts
*   `Slug`: Die URL (z.B. `10-tipps-fuer-parfum-allergiker`).  *Wichtig: Alles in Kleinbuchstaben, getrennt mit Bindestrichen!*
*   `Kategorie`: z.B. "Guide", "Gadget", "Hintergrundwissen"
*   `Tags`: Für tiefere Filterung (z.B. "Allergie", "Lavendel", "B2B")
*   `Publish Date` (Erscheinungsdatum): Datum, an dem der Artikel live gehen soll.
*   `Status`: Dropdown (Entwurf / Fertig / Archiviert).
*   `Inhalt`: Der eigentliche Textkörper als Notion Blocks (wird in Astro als lokales HTML/Markdown gerendert).

## 2. Astro "Dynamic Routing" (Dynamisches Routing)
In Astro werden wir nicht für jeden Blogpost eine eigene Datei erstellen. Stattdessen nutzen wir das **Dynamic Routing**.
Wir erstellen einen Ordner und eine Datei (je Sprache):
`src/pages/blog/[slug].astro`

Diese Datei verrichtet drei Dinge vollautomatisch während des Builds:
1. Sie fragt die neue Notion-Datenbank ab.
2. Sie filtert: `Wo liegt das "Publish Date" in der Vergangenheit UND "Status" = Fertig?`
3. Für jeden gefundenen Datensatz generiert sie eine eigene Unterseite (z.B. `itxasosibila.es/blog/dein-titel`) mit dem passenden Design.

## 3. Automatisierter Publishing-Flow ("Autopilot")
Da Google es nicht mag, wenn 100 Artikel am selben Tag online gehen und dann monatelang nichts passiert, sieht der Workflow so aus:
1. Artikel in Notion (als Batch / in großen Mengen) vorschreiben.
2. Unterschiedliche `Publish Dates` in der Zukunft zuweisen.
3. Auf Netlify einen "Scheduled Build" Timer (oder über Make.com) einrichten.
4. Netlify baut die Seite 2-3 Mal pro Woche morgens automatisch neu.
5. Artikel gehen pünktlich an ihrem Datum online – zu 100 % automatisiert.

## Nächste Schritte
Sobald das Fundament steht und die ersten Artikel in Notion angelegt sind, können wir die `[slug].astro`-Datei programmieren und das SEO-optimierte Layout entwerfen.
