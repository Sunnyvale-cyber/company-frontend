# FASAT Construction Color System

This project uses a restrained construction-dossier palette: warm paper for the working surface, charcoal for structure and navigation, concrete gray for rules and secondary information, and safety amber for actions and emphasis.

## Source Of Truth

The palette is defined in `tailwind.config.js` under `theme.extend.colors`.

| Token | Hex | Role |
| --- | --- | --- |
| `blueprint-950` | `#202522` | Deep charcoal: hero panels, primary buttons, admin navigation, strong text |
| `blueprint-900` | `#2B312D` | Secondary charcoal: contact panel and dark supporting surfaces |
| `blueprint-800` | `#4A514B` | Mid charcoal: borders on dark surfaces and quiet structure |
| `blueprint-700` | `#737A72` | Muted concrete: labels, metadata, secondary text |
| `blueprint-line` | `#C8C9C0` | Light construction rule and input border |
| `site-paper` | `#F4F1E8` | Main page surface and public content panels |
| `site-amber` | `#E8A62F` | Primary action, active state, focus ring, numbering, key highlights |
| `site-amberDark` | `#B97812` | Hover state and readable amber text on light surfaces |
| `site-logoBlue` | `#A6C9E2` | Brand logo color used in the logo asset |
| `site-concrete` | `#C8C9C0` | Borders, dividers, upload areas, neutral framing |
| `site-concreteDark` | `#737A72` | Metadata and supporting labels |

## Global Implementation

- `body` uses `site-paper` with a low-contrast blueprint grid.
- `.public-main` adds the shared grayscale construction photograph and a warm paper wash behind every public route.
- Admin routes do not receive `.public-main`; they use the paper surface directly inside `AdminLayout`.
- The public footer uses solid black with white supporting text and amber labels/hover states to match the black logo treatment.
- Headings use Barlow Condensed. Body copy uses Work Sans.
- Rounded cards are intentionally avoided for the main page structure. Borders, rules, corner marks, and spacing carry the visual hierarchy.
- White is reserved for readable controls, images, and small content surfaces. It is not the page background.

## Public Pages

### Home

- The hero uses `blueprint-950` as the dominant field with `site-paper` text.
- `site-amber` marks the location eyebrow, key phrase, and primary CTA.
- The snapshot panel uses `site-paper`; its small statistic blocks use white with concrete borders.
- Process and highlight sections use transparent paper background from the shared page shell and `section-card` where a framed surface is needed.

### About

- Uses the shared `.public-main` background with no page-specific color fill.
- Main text uses `blueprint-950` and `blueprint-950/80` for readable hierarchy.
- The three proof metrics use `site-amber` for numbers and `site-concreteDark` for labels.
- Metric blocks use `site-concrete` rules and the existing `plan-corners` amber registration marks.

### Services

- Uses the shared paper page surface.
- Service entries use `site-paper`, concrete borders, and a narrow `site-amber` index rail.
- Hover emphasis is charcoal shadow and a slightly raised position, not a new color gradient.
- `site-amber` identifies the service number; `blueprint-950/70` carries descriptions.

### Portfolio

- Uses the shared paper page surface.
- Filter buttons use `blueprint-950` for the selected category and `site-amber` for the selected status.
- Project cards use paper content areas, concrete borders, charcoal image placeholders, and amber status treatment for ongoing work.
- Project metadata uses `site-concreteDark`; locations are presented as technical `SITE /` labels.

### Contact

- The form uses white controls against the paper page surface for clear input boundaries.
- Labels and helper information use `site-concreteDark`.
- The direct-contact panel uses `blueprint-900`, with paper text and amber labels.
- Success feedback uses a translucent amber surface. Error feedback keeps the standard red semantic treatment so it is not confused with the brand accent.

## Admin Pages

- `AdminLayout` uses `site-paper` as the workspace and `blueprint-950` as the persistent navigation field.
- Active navigation uses `site-amber`; inactive navigation uses muted paper text.
- Dashboard metrics use paper panels with concrete rules and amber action hints.
- Projects and inquiries use flat paper panels, concrete borders, white form controls, and charcoal primary actions.
- Settings and login should follow the same rule: paper workspace, charcoal structure, amber actions, and concrete borders.

## Replacing The Background Photo

The public background image is declared in `.public-main::before` in `src/index.css`. The current implementation uses a remote Unsplash construction image with a solid concrete fallback color, grayscale treatment, and 13% opacity. The paper wash above it is 84% opaque, so the building reads as a quiet layer rather than a hero image. Replace the Unsplash URL with a company-owned image when one is available. Keep the image grayscale and low opacity so the content contrast and palette remain stable.
