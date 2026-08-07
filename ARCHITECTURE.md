# Portfolio architecture

The existing page remains a static HTML portfolio. Its visual markup and stylesheet are intentionally unchanged during this phase.

## JavaScript modules

```text
scripts/
├── config/site.js       # editable project and contact-service content
├── core/dom.js          # small DOM helpers and startup guard
├── features/
│   ├── contact.js       # contact form and hero email handoff
│   ├── feedback.js      # toast notifications
│   ├── motion.js        # Lenis, GSAP, cursor, canvas, and reveals
│   ├── navigation.js    # anchor links, mobile navigation, and FAQ
│   ├── projects.js      # portfolio tabs and project modal
│   ├── resume.js        # resume modal and PDF export
│   └── theme.js         # persisted light/dark preference
└── main.js              # one-time feature composition
```

`script.js` is now a compatibility entry point. It only loads `scripts/main.js`, so future migration can retain the current document while changing the implementation behind it.

## Editing content

- Update modal project details in `scripts/config/site.js`.
- Keep layout copy and section markup in `index.html` until an approved component migration.
- Keep presentational rules in `index.css` until the visual redesign phase.
