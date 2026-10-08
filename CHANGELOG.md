# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Adopted the DreamNight Design Language (DNDL v1.0, implementation 1.1.0). The
  upstream `tokens.css`, `materials.css`, `motion.css` and `LICENSE` are vendored
  verbatim in `public/vendor/dndl/` with a `VERSION` provenance file, and linked
  from the root layout ahead of the product stylesheet.
- `src/lib/theme.ts` (brand colour per track category, grade ordering, resource
  type/cost labels), `src/lib/trackView.ts` (merges a track's resource list with
  the resource library by URL) and `src/components/layout/SiteNav.tsx`.
- Level 3 detail drawer for timeline nodes: Escape to close, focus moved in and
  returned to the row that opened it, content underneath left mounted.
- `src/app/not-found.tsx`.

### Changed

- Full layout and information architecture rework around solid brand colour
  fields, hairline segmentation and typographic hierarchy. Every route keeps its
  URL, data flow and behaviour; all figures are still derived from the bundled
  JSON in `src/data`.
- Navigation moved into the root layout and now uses real links with
  `aria-current` on every route, including track detail pages.
- The timeline now shows which tracks each node belongs to, and track pages show
  their slice of the shared timeline.
- Overview text renders its inline `**emphasis**` markers instead of leaking them.

### Removed

- `src/components/layout/BottomNav.tsx`, replaced by `SiteNav.tsx`. The bottom
  tab bar is preserved as the mobile presentation of the same navigation.
- The decorative animated background on `body` (an infinite 16s loop) and the
  global `border-radius: 0 !important` override.

## [0.1.0] - 2026-07-31

### Added

- Initial project scaffold with Next.js 14, worldline landing page concept

[0.1.0]: https://github.com/dreamnight16/edutrack/releases/tag/v0.1.0
