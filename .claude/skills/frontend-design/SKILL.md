# frontend-design skill

Create distinctive, production-grade frontend interfaces with exceptional aesthetic quality. Avoid generic "AI slop" aesthetics.

## Design Thinking (before coding)
1. **Purpose** — What problem does this solve? Who is the user?
2. **Tone** — Pick ONE bold direction: brutally minimal / maximalist / retro-futuristic / luxury / playful / brutalist / art deco / soft+pastel / industrial
3. **Constraints** — Tech stack, browser targets, performance budget
4. **Differentiation** — What makes it unforgettable?

## Typography
- Choose fonts that are beautiful, unique, and interesting
- Avoid generic fonts: Inter, Roboto, Arial, Helvetica
- Pair a distinctive display font with a refined body font
- Use weight contrast dramatically (thin italic next to heavy upright)
- Large type as a design element, not just a label

## Color & Theme
- Commit to a cohesive palette — dominant color + 1-2 sharp accents
- Use CSS variables for every color
- Dark + light contrast — never flat same-tone designs
- Gold/cream/warm neutrals for luxury; cold neons for futurism

## Motion
- HTML: CSS-only animations preferred
- React: use Framer Motion
- Focus on high-impact moments: staggered page-load reveals, scroll-triggered entrances
- Hover micro-interactions on every interactive element
- Never animate everything — restraint is craft

## Spatial Composition
- Asymmetrical layouts — break the grid intentionally
- Overlapping elements (badges over images, text over sections)
- Diagonal flows, clip-path section breaks
- Generous negative space — luxury brands breathe
- Grid-breaking large type

## Backgrounds & Visual Details
- Gradients with direction intent (not just top-to-bottom)
- Subtle noise/grain texture for depth
- Layered effects: shadow behind shadow, glow inside glow
- Contextual patterns (dots, lines, organic shapes)
- Glass/frosted panels (backdrop-filter) for depth

## Anti-patterns to AVOID
- Inter/Roboto/Arial as primary font
- Purple #7C3AED gradients
- Generic card → title → description → button layout
- Flat same-weight text everywhere
- No hover states
- Bootstrap/Material default components
- 8px border-radius everywhere
- Center-aligned everything
