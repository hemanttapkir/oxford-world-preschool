# Oxford World Preschool

## Current State
No existing project. Building from scratch based on a provided HTML reference.

## Requested Changes (Diff)

### Add
- Full playful preschool website for "Oxford World Preschool" in Pune
- Animated floating kid characters/illustrations in each section
- Hero section with large headline, tagline, "Book a Visit" CTA, and WhatsApp button
- Programs section: Playgroup (1.5–2.5 yrs), Nursery (2.5–3.5 yrs), Junior KG (3.5–4.5 yrs)
- Pune branches section: Wadgaon Sheri and Lohegaon locations
- Admissions CTA section
- Footer with social icons and admissions info
- Fixed nav with logo, About, Programs links, and "Apply Now" button
- Scroll animations (fade-in, zoom-in) on section entry
- Floating/swaying kid SVG decorations in background of each section

### Modify
- Complete visual redesign: bright, bold, playful color palette (sky blue, sunshine yellow, mint green, coral pink, orange)
- Rounded bubbly cards, wobbly/wavy section dividers
- Large fun typography, emoji-rich headings
- Kid illustration assets generated as images (hero mascot, playing kids scene)

### Remove
- Nothing (new project)

## Implementation Plan
1. Generate hero mascot image (happy kids playing) and supporting illustration
2. Generate Motoko backend with contact/inquiry submission
3. Build React frontend with:
   - Fixed colorful nav
   - Hero with animated floating elements and generated kid images
   - Wavy section dividers between sections
   - Programs cards with emoji icons and hover animations
   - Locations cards
   - Admissions CTA banner
   - Footer with social links
   - Scroll animations via Intersection Observer
   - Mobile responsive layout
